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
    const describedBy = error ? `${id}-error` : undefined;
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
            style={{
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              width: "1px",
            }}
          />
        )}
        <input
          id={id}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={describedBy}
          ref={ref}
          {...inputProps}
        />
        {error && (
          <span id={describedBy} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
