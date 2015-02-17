package com.learningcn.plato;

import com.learningcn.plato.ast.ASTree;

public class PlatoException extends RuntimeException {
  /**
   * 
   */
  private static final long serialVersionUID = -5718614428593339960L;
  public PlatoException(String m) { super(m); }
  public PlatoException(String m, ASTree t) {
    super(m + " " + t.location());
  }
}
