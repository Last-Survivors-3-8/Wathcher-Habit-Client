import React from 'react';
import NotificationItem from './NotificationItem';
import { useNavigate } from 'react-router-dom';
import logoutAPI from '../../services/api/logout';

const bellIcon = `${process.env.PUBLIC_URL}/images/notification/bell.png`;

const NotificationList = ({ notifications, setNotifications }) => {
  const navigate = useNavigate();

  const closeAllNotifications = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isVisible: false,
      })),
    );
  };

  const setIsVisible = (id, value) => {
    setNotifications(
      notifications.map((notification) =>
        notification._id === id
          ? { ...notification, isVisible: value }
          : notification,
      ),
    );
  };

  const handleLogout = async () => {
    try {
      await logoutAPI();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div
      className='bg-dark-blue-bg rounded-lg h-[80vh] flex flex-col'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <div className='flex justify-between p-2 items-center'>
        <div className='flex items-center'>
          <img src={bellIcon} alt='bell icon' className='h-4 w-4 mr-2' />
          <p className='text-green-txt font-bold'>알림</p>
        </div>
        <button
          className='text-sm text-gray-400'
          onClick={closeAllNotifications}
        >
          전체 알림 닫기
        </button>
      </div>

      <div className='overflow-y-auto flex-grow custom-scrollbar'>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            content={notification.content}
            date={notification.createdAt}
            status={notification.status}
            isVisible={notification.isNeedToSend}
            setIsVisible={(value) => setIsVisible(notification._id, value)}
          />
        ))}
      </div>

      <div className='flex-shrink-0'>
        <button
          className='w-full text-center py-2 text-sm text-red-400'
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default NotificationList;