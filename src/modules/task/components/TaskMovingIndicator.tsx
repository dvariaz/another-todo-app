import {
  useEffect,
  useRef,
  useState,
  useCallback,
  SyntheticEvent,
} from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

// Types
import { IPosition } from "@common/types/Position";

// Constants
import { TASK_POINTER_SIZE } from "@constants/pointer";

// Hooks
import useTaskMoving from "@dashboard/hooks/useTaskMoving";

interface ITaskMovingIndicatorProps {
  initialPosition: IPosition;
}

const TaskMovingIndicator = ({
  initialPosition,
}: ITaskMovingIndicatorProps) => {
  const ref = useRef(null);
  const { taskMovingEvent } = useTaskMoving();
  const [position, setPosition] = useState<IPosition>(initialPosition);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const deltaX = e.clientX;
    const deltaY = e.clientY;
    setPosition({ x: deltaX, y: deltaY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!taskMovingEvent) return null;

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
    >
      <motion.div
        initial={{
          x: taskMovingEvent.pointer.x,
          y: taskMovingEvent.pointer.y,
          width: taskMovingEvent?.pointer.width,
          height: taskMovingEvent?.pointer.height,
        }}
        animate={{
          x: position.x - TASK_POINTER_SIZE / 2,
          y: position.y - TASK_POINTER_SIZE / 2,
          width: TASK_POINTER_SIZE,
          height: TASK_POINTER_SIZE,
        }}
        className="card bg-white rounded-xl"
      ></motion.div>
    </div>,
    document.getElementById("overlays") as HTMLElement
  );
};

export default TaskMovingIndicator;
