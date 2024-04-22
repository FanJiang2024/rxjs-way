

interface WithHocProps {}

export const clientOnly = <T extends WithHocProps = WithHocProps>(
  Comp: React.ComponentType<T>,
) => {
  const withHocProps = {};

  // Try to create a nice displayName for React Dev Tools.
  const displayName = Comp.displayName || Comp.name || "Component";

  const C = (props: Omit<T, keyof WithHocProps>) => {
    // props comes afterwards so the can override the default ones.
    return (
      <>
        {typeof window !== undefined && (
          <Comp {...withHocProps} {...(props as T)} />
        )}
      </>
    );
  };

  C.displayName = `clientOnly(${displayName})`;

  return C;
};
