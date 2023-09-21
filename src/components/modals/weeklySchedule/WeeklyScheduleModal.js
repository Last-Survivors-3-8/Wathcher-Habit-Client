import React, { useRef } from 'react';
import Loading from './Loading';
import WeeklySchedule from './WeeklySchedule';
import { useClickOutside } from '../../../hooks/useClickOutside';
import useWeeklySchedule from '../../../hooks/useWeeklySchedule';

const WeeklyScheduleModal = ({ onClose }) => {
  const { isLoading, weeklySchedule } = useWeeklySchedule();
  const modalContentRef = useRef();

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  useClickOutside(modalContentRef, handleClose);

  return (
    <div className='fixed inset-0 w-full flex items-center justify-center z-40 bg-black bg-opacity-50'>
      {isLoading ? (
        <Loading />
      ) : (
        <WeeklySchedule
          weeklySchedule={weeklySchedule}
          modalContentRef={modalContentRef}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default WeeklyScheduleModal;