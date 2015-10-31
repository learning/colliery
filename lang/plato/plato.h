typedef struct Variable_tag {
  char                *name; // 变量名
  PLT_Value           value; // 变量值
  struct Variable_tag *next; // 指向下一个变量的指针
} Variable;

typedef enum {
  PLATO_FUNCTION_DEFINITION = 1,
  NATIVE_FUNCTION_DEFINITION
} FunctionDefinitionType;

struct PLT_Interpreter_tag {
  MEM_Storage         interpreter_storage;
  MEM_Storage         execute_storage;
  Variable            *variable;
  FunctionDefinition  *function_list;
  StatementList       *statement_list;
  int                 current_line_number;
};
