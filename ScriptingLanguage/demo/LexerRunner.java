package demo;

import com.learningcn.plato.CodeDialog;
import com.learningcn.plato.Lexer;
import com.learningcn.plato.ParseException;
import com.learningcn.plato.Token;

public class LexerRunner {

  public static void main(String[] args) throws ParseException {
    Lexer l = new Lexer(new CodeDialog());
    for (Token t; (t = l.read()) != Token.EOF; ) {
      System.out.println("=> " + t.getText());
    }
  }

}
