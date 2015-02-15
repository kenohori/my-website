class SpecialLetters
	
	@@letters = {
		"---" => "—",
		"--" => "–",

		"\\\"a" => "ä",
		"\\\"e" => "ë",
		"\\\"i" => "ï",
		"\\\"o" => "ö",
		"\\\"u" => "ü",
		"\\\"A" => "Ä",
		"\\\"E" => "Ë",
		"\\\"I" => "Ï",
		"\\\"O" => "Ö",
		"\\\"U" => "Ü",

		"\\\'a" => "á",
		"\\\'e" => "é",
		"\\\'i" => "í",
		"\\\'o" => "ó",
		"\\\'u" => "ú",
		"\\\'A" => "Á",
		"\\\'E" => "É",
		"\\\'I" => "Í",
		"\\\'O" => "Ó",
		"\\\'U" => "Ú",

		"\\\^a" => "â",
		"\\\^e" => "ê",
		"\\\^i" => "î",
		"\\\^o" => "ô",
		"\\\^u" => "û",
		"\\\^A" => "Â",
		"\\\^E" => "Ê",
		"\\\^I" => "Î",
		"\\\^O" => "Ô",
		"\\\^U" => "Û"
	}

	def convert(letter)
		if @@letters.has_key?(letter) then
			@@letters[letter]
		elsif letter.length == 2 and letter[0] == "\\" then
			letter[1]
		else
			puts "Warning: not supported letter " + letter
			letter
		end
	end

end