import { useEffect } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";

import "@task/styles/TaskCard.css";

// Types
import { ITask } from "@task/types/Task";

// Components
import TextareaAutosize from "react-textarea-autosize";

interface IEditableTaskCardProps {
  title?: string;
  description?: string;
  onSave?: (data: Partial<ITask>) => void;
  onBlur?: (isNew: boolean, isDirty: boolean) => void;
  className?: string;
}

const EditableTaskCard = ({
  title,
  description,
  onSave,
  onBlur,
  className,
}: IEditableTaskCardProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<Partial<ITask>>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Partial<ITask>> = (data: Partial<ITask>) => {
    onSave && onSave(data);
  };

  /**
   * Effect to refresh form by changing props
   */
  useEffect(() => {
    reset({ title, description });
  }, [title, description]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onBlur={() => {
        const isNew = title === "" && description === "";
        onBlur && onBlur(isNew, isDirty);
      }}
      className={classNames("task-card card flex flex-col", className)}
    >
      <div className="flex mb-2">
        <input
          defaultValue={title}
          placeholder="Title"
          className="input"
          autoComplete="off"
          autoFocus
          {...register("title", { required: true })}
        />
        {/* <img
          src={created_by.profile_photo}
          className="circle-photo ml-4"
          alt={`${created_by.name} photo`}
        /> */}
      </div>
      <TextareaAutosize
        defaultValue={description}
        placeholder="Short description"
        className="input text-sm"
        autoComplete="off"
        minRows={3}
        {...register("description")}
      />
      <button
        type="submit"
        className="btn-primary mt-5"
        disabled={!(isValid && isDirty)}
      >
        Save
      </button>
    </form>
  );
};

EditableTaskCard.defaultProps = {
  title: "",
  description: "",
};

export default EditableTaskCard;
