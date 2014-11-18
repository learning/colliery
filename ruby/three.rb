age = gets.to_i

output = if age < 10
           "It's a young person."
         elsif age < 19
           "It's a teenager."
         else
           "It's not a young person."
         end

puts output
