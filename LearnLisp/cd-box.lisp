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

;show prompt for make a cd
(defun prompt-for-cd ()
  (make-cd
   (prompt-read "Title")
   (prompt-read "Artist")
   (or (parse-integer (prompt-read "Rating") :junk-allowed t) 0)
   (y-or-n-p "Ripped [y/n]")))

;add cds for database
(defun add-cds ()
  (loop (add-record (prompt-for-cd))
     (if (not (y-or-n-p "Another? [y/n]: ")) (return))))

;save database to file
(defun save-db (filename)
  (with-open-file (out filename
		       :direction :output
		       :if-exists :supersede)
    (with-standard-io-syntax
      (print *db* out))))

;load database from file
(defun load-db (filename)
  (with-open-file (in filename)
    (with-standard-io-syntax
      (setf *db* (read in)))))

(defun select (selector-fn)
  (remove-if-not selector-fn *db*))

(defun where (&key title artist rating (ripped nil ripped-p))
  #'(lambda (cd)
      (and
       (if title    (equal (getf cd :title) title)   t)
       (if artist   (equal (getf cd :artist) artist) t)
       (if rating   (equal (getf cd :rating) rating) t)
       (if ripped-p (equal (getf cd :ripped) ripped) t))))
