require 'benchmark'
require 'nori'
require 'pry'

results = []

time = Benchmark.measure do

  files = Dir[File.expand_path('../../fixtures/**/*.*', __FILE__)]

  parser = Nori.new(:advanced_typecasting => false)

  ENV['EXECUTION_CYCLES'].to_i.times do
    files.each do |file|
      xml = File.read(file)
      results << parser.parse(xml)
    end
  end

end

puts "#{RUBY_ENGINE} parsing #{time.real.to_i*1000}ms"
