---
layout: post
title: "Dimension-independent programming using C++ templates"
date: 2016-07-10 14:39
categories: en
lang: en
---

<img src="{{ site.baseurl }}/img/blog/simplex.jpg" class="img-responsive center-block" alt="Simplices of various dimensions">

It's one of those typical programming conundrums. 
Popular (programmer) wisdom dictates that your code can be either efficient but inflexible, or flexible but resource intensive.
Trying to do both most often than not fails *spectacularly*.

However, once in a while, one finds a pretty amazing exception, which on first look can seem almost like magic.
That is, until you learn how it works on a technical level.
For instance, several years ago I was dumbfounded at how [DTrace](http://dtrace.org/)---a nice tracing framework---manages to achieve [zero overhead](http://dtrace.org/blogs/brendan/2011/02/18/dtrace-pid-provider-overhead/) when it is not enabled.

Some time later, I had a similar feeling about how CGAL [Combinatorial maps](http://doc.cgal.org/latest/Combinatorial_map/index.html) manage to be both fast and completely dimension independent.
The answer lies in clever *template meta-programming* using recursive C++11 templates, a solution that I then incorporated extensively into my [PhD work](https://3d.bk.tudelft.nl/ken/en/thesis/).

Template meta-programming is a technique that uses templates to generate certain data structures or perform certain computations during the compilation of a program rather than during its execution.
This technique is normally used as a way to support generic programming by defining functions that can deal with different data types indistinctly.
For instance, I often use [this](http://www.cplusplus.com/forum/articles/9645/) nifty piece of code to easily parse numbers into different data types.

{% highlight c++ %}
template <typename T>
T string_to_number (const std::string &text, T def_value) {
  std::stringstream ss;
  for (std::string::const_iterator i = text.begin(); i != text.end(); ++i)
    if (isdigit(*i) || *i=='e' || *i=='-' || *i=='+' || *i=='.') ss << *i;
  T result;
  return ss >> result ? result : def_value;
}
{% endhighlight %}

However, apart from this common use, templates can also be used to create complex type- and dimension-independent data structures and algorithms.
CGAL does this using the [Traits](http://accu.org/index.php/journals/442) programming technique, which exploits C++'s `typedef` declarations to create custom types.
As an example, I used this type of approach in my thesis to convert *n*-dimensional datasets into *(n+1)*-dimensional ones.
The types of the *n*- and *(n+1)*-dimensional datasets are automatically derived based on *n*, which is passed as a template parameter at compilation time.
Since higher-dimensional programming is usually heavily constrained by CPU time during execution, **this effectively brings the best of both worlds: dimension-independence and speed**.

{% highlight c++ %}
template <unsigned int dimension>
class Linear_cell_complex_extruder_with_range {
public:
  typedef typename Linear_cell_complex<dimension>::type Lower_dimensional_cell_complex;
  typedef typename Linear_cell_complex<dimension+1>::type Higher_dimensional_cell_complex;
  typedef Linear_cell_complex_extruder_with_range<dimension> Self;
  
private:
  Lower_dimensional_cell_complex ldcc;
  Higher_dimensional_cell_complex hdcc;
};
{% endhighlight %}

However, to truly exploit this type of mechanism in dimension-independent programming, you need *recursive templates*.
With these, you can build a complex data structure or solve a problem by iterating dimension by dimension at compilation time.

Let's consider a similar example to one used in my thesis, a data structure where we want to store a value (represented here by a `float`, but it can be an arbitrarily complex data structure of its own) for every object (represented here by an `Object *` pointer) of every dimension.
Essentially, this would be a `std::map<Object *, float>`.
First, we define a custom `struct` named `Value_map_of_dimension`, which stores the values map for a single (templated) dimension.
Note the use of the `typedef` to define the `type` before using it.

{% highlight c++ %}
template <unsigned int dimension>
struct Values_map_of_dimension {
public:
  typedef std::map<Object *, float> type;
  type values_map;
};
{% endhighlight %}

Then, we use a templated `struct` that defines `Values_map_tuple_per_dimension_up_to`, which will store a dimension-dependent tuple of the previous data structures where each element of the tuple will contain one instance of `Value_map_of_dimension`.
Here, the first template parameter is the dimension and the second is the tuple, which is initialised to an empty one.

{% highlight c++ %}
template <unsigned int dimension, class Result = std::tuple<>>
struct Values_map_tuple_per_dimension_up_to;
{% endhighlight %}

This `struct` is specialised using a recursive template that prepends the tuple with an instance of `Values_map_of_dimension` for the current `dimension` and calls itself with `dimension-1`.

{% highlight c++ %}
template <unsigned int dimension, class ... Result>
struct Values_map_tuple_per_dimension_up_to<dimension, std::tuple<Result ...>> {
  typedef typename Values_map_tuple_per_dimension_up_to<dimension - 1, 
    std::tuple<Values_map_of_dimension<dimension>, Result ...>>::type type;
};
{% endhighlight %}

Finally, this `struct` is further specialised with a terminating condition for dimension 0, where the tuple is returned as is.

{% highlight c++ %}
template <class ... Result>
struct Values_map_tuple_per_dimension_up_to<0, std::tuple<Result ...>> {
  typedef std::tuple<Values_map_of_dimension<0>, Result ...> type;
};
{% endhighlight %}

For the compiler to build this data structure correctly, it is crucial to ensure that the last `struct` is a more complete specialisation of `Values_map_tuple_per_dimension_up_to`.
It should therefore have one fewer template parameter than the previous one.