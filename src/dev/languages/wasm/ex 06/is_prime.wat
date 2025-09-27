(module

  ;; add the $even_check function to the top of the module
  (func $even_check (param $n i32) (result i32)
        local.get $n
        i32.const 2
        i32.rem_u   ;; if you take the remainder of a division by 2
        i32.const 0 ;; even numbers will have a remainder 0
        i32.eq      ;; $n % 2 == 0
    )
    
    (func $eq_2 (param $n i32) (result i32)
        local.get $n
        i32.const 2
        i32.eq    ;; returns 1 if $n == 2
    )

    (func $multiple_check (param $n i32) (param $m i32) (result i32)
        local.get $n
        local.get $m
        i32.rem_u     ;; get the remainder of $n / $m
        i32.const 0   ;; I want to know if the remainder is 0
        i32.eq        ;; that will tell us if $n is a multiple of $m
    )


    (func (export "is_prime") (param $n i32) (result i32)
        (local $i i32)
        (if (i32.eq (local.get $n) (i32.const 1)) ;; 1 is not prime
            (then i32.const 0 return))

        (if (call $eq_2 (local.get $n)) ;; check to see if $n is 2
            (then i32.const 1 return )  ;; 2 is prime

        (block $not_prime 
            (call $even_check (local.get $n))
                br_if $not_prime ;; even numbers are not prime (except 2)
                (local.set $i (i32.const 1)) ;; set i to 1 to start loop
                (loop $prime_loop
                    (local.tee $i (i32.add (local.get $i) (i32.const 2) ) ) ;; $i += 2
                    local.get $n  ;; stack = [$n, $i]
                )


            )

    )
        i32.const 0 ;; remove later
    )
)