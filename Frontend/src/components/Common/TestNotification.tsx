import Swal from 'sweetalert2';
import { NavigateFunction } from 'react-router-dom';

const TestNotification = () => {
  Swal.fire({
    title: '실제 서버 없이 동작하는 버전입니다.',
    toast: true,
    position: 'top',
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: true,
    showClass: {
      popup: 'animate__animated animate__slideInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__slideOutUp',
    },
    didOpen: (toast) => {
      // toast.addEventListener('mouseenter', Swal.stopTimer);
      // toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};

export default TestNotification;
