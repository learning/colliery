;global database
(defvar *db* nil)

;make a cd
(defun make-cd (title artist rating ripped)
  (list :title title :artist artist :rating rating :ripped ripped))

;add cd to database
(defun add-record (cd) (push cd *db*))

;dump database to human readable
;t is shorthand for the *standard-output*
(defun dump-db ()
  (dolist (cd *db*)
    ;~a aesthetic directive, consume one argument
    ;~10t 10 times tabulating
    ;~% newline
    ;~{ and ~} loop the list
    (format t "~{~a:~10t~a~%~}~%" cd)))

;another edition
;(defun dump-db ()
;  (format t "~{~{~a:~10t~a~%~}~%~}" *db*))

;show prompt to read an input from user
(defun prompt-read (prompt)
  (format *query-io* "~a: " prompt)
  (force-output *query-io*)
  (read-line *query-io*))