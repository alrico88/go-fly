export function useUpperRef<T extends object>(target: T, property: keyof T) {
  return computed({
    get() {
      return Reflect.get(target, property) as string;
    },
    set(val: string) {
      Reflect.set(target, property, val.toUpperCase());
    },
  });
}
