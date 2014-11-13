#include <stdio.h>
#include <windows.h>

#define BUFFER_SIZE 25

int main(void) {
  printf("----- child process running -----\n");

  HANDLE ReadHandle;
  CHAR buffer[BUFFER_SIZE];
  DWORD read;

  /* get the read handle of the pipe */
  ReadHandle = GetStdHandle(STD_INPUT_HANDLE);

  /* the child reads from the pipe */
  printf("----- Read message from pipe -----\n");
  if (ReadFile(ReadHandle, buffer, BUFFER_SIZE, &read, NULL)) {
    printf("child read: %s\n", buffer);
  } else {
    fprintf(stderr, "Error reading from pipe.\n");
  }

  return 0;
}