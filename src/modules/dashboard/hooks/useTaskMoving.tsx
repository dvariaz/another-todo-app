// Hooks
import { useAppDispatch, useAppSelector } from "@common/hooks/rtk";

// Actions and Selectors
import { DashboardActions, DashboardSelectors } from "@dashboard/store/slice";

const useTaskMoving = () => {
  const dispatch = useAppDispatch();

  const taskMovingEvent = useAppSelector((state) =>
    DashboardSelectors.selectTaskMovingEvent(state)
  );

  const startTaskMoving = (
    taskId: string,
    taskGroupId: string,
    taskInitialPosition: number,
    pointerInitialPosition: DOMRect
  ) => {
    dispatch(
      DashboardActions.startTaskMoving({
        taskId,
        taskGroupOrigin: taskGroupId,
        taskInitialPosition,
        pointerInitialPosition,
      })
    );
  };

  const cleanMovingEvent = () => {
    dispatch(DashboardActions.cleanTaskMoving());
  };

  return {
    taskMovingEvent,
    startTaskMoving,
    cleanMovingEvent,
  };
};

export default useTaskMoving;
