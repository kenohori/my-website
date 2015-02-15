require 'liquid'

require_relative 'imbiber'

class ImbiberTag < Liquid::Tag
	def initialize(tag_name, command, tokens)
		super
		@arguments = {}
		command.split.each do |part|
			if part.include?(':') then
				keyval = part.split(":")
				@arguments[keyval[0].to_sym] = keyval[1]
			else
				@file = part
			end
		end
		@imbiber = Imbiber.new(@arguments)
		@imbiber.read(@file)
	end

	def render(context)
		if @arguments.has_key?(:one) then
			@imbiber.html_of(@arguments[:one].to_sym)
		else
			if @arguments.has_key?(:groupby) then
				@groupby = @arguments[:groupby]
			else
				@groupby = :year
			end
			if @arguments.has_key?(:sortby) then
				@sortby = @arguments[:sortby]
			else
				@sortby = :date
			end
			if @arguments.has_key?(:order) then
				@order = @arguments[:order]
			else
				@order = :desc
			end
			@imbiber.html_of_all(@groupby, @sortby, @order)
		end
	end
end

Liquid::Template.register_tag('imbiber', ImbiberTag)
# template = Liquid::Template.parse('{% imbiber publications.bib one:14icaa %}')
# puts template.render