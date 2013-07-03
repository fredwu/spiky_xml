require 'benchmark'
require 'nori'
require 'pry'
require 'celluloid'
require 'celluloid/pmap'

results = []

time = Benchmark.measure do

  files = Dir[File.expand_path('../../fixtures/**/*.*', __FILE__)]

  parser = Nori.new(:advanced_typecasting => false)

  ENV['EXECUTION_CYCLES'].to_i.times.pmap do
    files.each do |file|
      xml = File.read(file)
      results << parser.parse(xml)
    end
  end

end

puts "#{RUBY_ENGINE} concurrent parsing #{time.real.to_i*1000}ms"
