---
layout: post
title: "Using a C++ map or set with geometric data"
date: 2016-06-19 18:25
categories: en
lang: en
---

One of the most typical building blocks of efficient geometric computations is a *spatial index*. Using a spatial index, it is possible to perform many simple operations quickly, like obtaining a set of unique points. Such an operation can then be used for things like building a topological data structure or indexing more complex objects.

<a href="https://commons.wikimedia.org/wiki/File:RTree-Visualization-3D.svg"><img src="{{ site.baseurl }}/img/blog/rtree.svg" class="img-responsive center-block" alt="An R-tree in 3D"></a>

However, properly implementing a spatial index is messy and, frankly, overkill for many practical applications. And yet, computations without one can be *mind-bogglingly slow*. So, I often resort to a quick hack---using a C++ standard library `set` or `map` with a custom comparison function. A `set` or `map` offers logarithmic time access to its elements, much like most spatial indices, and it works out of the box for plain old data types like `float` or `int`. Moreover, in order for you to use it with any class you're working with, it only needs a custom comparison functor[^1] that defines an ordering of its elements[^2].

So, let's look at an example of some code I'm currently working on. A CGAL `Point_d` is a simple data structure for a *d*-dimensional point. I personally want to use these kinds of points to quickly access unique geometric objects embedded at those locations, and so I created a custom comparison functor for them. It orders points first by their dimension and then lexicographically by their coordinates:

{% highlight c++ %}
struct Point_d_comparator {
  bool operator()(const Point_d &p1, const Point_d &p2) const {
    
    if (p1.dimension() < p2.dimension()) return true;
    if (p1.dimension() > p2.dimension()) return false;
    
    Point_d::Cartesian_const_iterator p1_coordinate = p1.cartesian_begin()
    Point_d::Cartesian_const_iterator p2_coordinate = p2.cartesian_begin();
    while (p1_coordinate != p1.cartesian_end()) {
      if (*p1_coordinate < *p2_coordinate) return true;
      if (*p1_coordinate > *p2_coordinate) return false;
      ++p1_coordinate;
      ++p2_coordinate;
    } return false;
  }
};
{% endhighlight %}

In a simple example, such a comparison functor can then be used to define a set of unique points (as defined by their coordinates). For instance, this allows you to assign unique IDs to a location.

{% highlight c++ %}
std::set<Point_d, Point_d_comparator> vertices;
{% endhighlight %}

In a more complex example, the same comparison functor can be used to index a set of edges (as defined by a unique start-end pair of points). I personally use this kind of structure to link a set of adjacent polygons by their common edges and to check if such a set forms a quasi-manifold in 3D.

{% highlight c++ %}
std::map<Point_d, std::map<Point_d, int, Point_d_comparator>, Point_d_comparator> edges;
{% endhighlight %}

For a future blog post, how to do something similar with a more efficient (constant time) C++11 `unordered_map` and a custom hashing function.

---

[^1]: A functor is an object that behaves like a function. In C++, a functor is a `class` or `struct` that does this by overloading the () operator. Unlike function pointers, they are fast since they are generated at compilation time.
[^2]: Most people choose to mimic the value of the < (less than) operator, which is what `set` and `map` do for plain old types.