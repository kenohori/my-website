class LocalisedText
	@@words = {
		:en => {
			:and => 'and',
			:In => 'In',
			:eds => 'eds.',
			:Chapter => 'Chapter',
			:pp => 'pp.',
			:mscthesis => 'Master\'s thesis',
			:phdthesis => 'PhD thesis',
			:techreport => 'Technical report',
			:Paper => 'Paper',
			:Poster => 'Poster',
			:Slides => 'Slides',
			:www => 'External link',
			:Unknown => 'Unknown'
		},
		:es => {
			:and => 'y',
			:In => 'En',
			:eds => 'eds.',
			:Chapter => 'capítulo',
			:pp => 'pp.',
			:mscthesis => 'Tesis de maestría',
			:phdthesis => 'Tesis doctoral',
			:techreport => 'Reporte técnico',
			:Paper => 'Artículo',
			:Poster => 'Póster',
			:Slides => 'Presentación',
			:www => 'Enlace externo',
			:Unknown => 'Desconocido'
		}
	}

	@@months = {
		:en => {
			"jan" => "January",
			"feb" => "February",
			"mar" => "March",
			"apr" => "April",
			"may" => "May",
			"jun" => "June",
			"jul" => "July",
			"aug" => "August",
			"sep" => "September",
			"oct" => "October",
			"nov" => "November",
			"dec" => "December"
		},
		:es => {
			"jan" => "enero",
			"feb" => "febrero",
			"mar" => "marzo",
			"apr" => "abril",
			"may" => "mayo",
			"jun" => "junio",
			"jul" => "julio",
			"aug" => "agosto",
			"sep" => "septiembre",
			"oct" => "octubre",
			"nov" => "noviembre",
			"dec" => "diciembre"
		}
	}

	def initialize(locale = :en)
		@locale = locale
	end

	def localise(word)
		@@words[@locale][word]
	end

	def localisedmonth(month)
		@@months[@locale][month]
	end
end