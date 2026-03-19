import { forwardRef, ReactElement } from "react";

type FormFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  honeypotName?: string;
  wrapperClassName?: string;
};

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { id, label, error, honeypotName, wrapperClassName, ...inputProps },
    ref,
  ): ReactElement => {
    const errorId = `${id}-error`;
    const describedBy =
      [inputProps["aria-describedby"], error ? errorId : undefined].filter(Boolean).join(" ") || undefined;
    const hasError = Boolean(error);

    return (
      <div className={wrapperClassName}>
        <label htmlFor={id}>{label}</label>
        {honeypotName && (
          <input
            name={honeypotName}
            type="text"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
          />
        )}
        <input
          {...inputProps}
          id={id}
          aria-invalid={hasError ? "true" : inputProps["aria-invalid"]}
          aria-describedby={describedBy}
          ref={ref}
        />
        {error && (
          <span id={errorId} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
