---
layout: code
---

{% raw %} 
<pre>
    <code class="language-lua">
        local HM_type = {}

        function HM_type.of(value)
            if type(value) == "number" then
                return "number"
            elseif type(value) == "string" then
                return "string"
            elseif type(value) == "table" then
                return "table"
            elseif type(value) == "boolean" then
                return "boolean"
            elseif type(value) == "function" then
                return "function"
            else
                return "nil"
            end
        end

        function HM_type.can_assign(a, b)
            if a == "number" and b == "number" then
                return true
            elseif a == "string" and b == "string" then
                return true
            elseif a == "table" and b == "table" then
                return true
            elseif a == "boolean" and b == "boolean" then
                return true
            elseif a == "function" and b == "function" then
                return true
            else
                return false
            end
        end

        function HM_type.can_call(a, b)
            if a == "function" and b == "function" then
                return true
            else
                return false
            end
        end

        local numbers = {1, 2, 3}
        local strings = {"hello", "world", "lua"}
        local tables = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
        local booleans = true, false
        local functions = function() end, function() end

        print(HM_type.of(numbers)) -- prints "table"
        print(HM_type.of(strings)) -- prints "string"
        print(HM_type.of(tables)) -- prints "table"
        print(HM_type.of(booleans)) -- prints "boolean"
        print(HM_type.of(functions)) -- prints "function"

        local numbers_table = {1, 2, 3}
        local strings_table = {"hello", "world", "lua"}

        print(HM_type.can_assign(numbers_table, numbers)) -- prints "true"
        print(HM_type.can_assign(strings_table, strings)) -- prints "true"
        print(HM_type.can_assign(numbers_table, strings_table)) -- prints "false"

        print(HM_type.can_call(functions, functions)) -- prints "true"
        print(HM_type.can_call(functions, numbers_table)) -- prints "false"
    </code>
</pre>
{% endraw %}
