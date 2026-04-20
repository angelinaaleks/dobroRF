import React from 'react';
import styles from './styles.module.scss';
import { ContextApp } from '../../context';

export const Modal = () => {
  const { setOpenSV } = React.useContext(ContextApp);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isAgreed, setIsAgreed] = React.useState(false);
  const [errors, setErrors] = React.useState({
    name: '',
    phone: '',
    message: '',
    agreement: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
    if (errors.agreement) {
      setErrors((prev) => ({
        ...prev,
        agreement: '',
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      message: '',
      agreement: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать хотя бы 2 символа';
      isValid = false;
    }

    const phoneRegex = /^[\d\+][\d\(\)\ -]{4,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, введите номер телефона';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Пожалуйста, введите ваше сообщение';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать хотя бы 10 символов';
      isValid = false;
    }

    if (!isAgreed) {
      newErrors.agreement = 'Необходимо согласие на обработку персональных данных';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData.name, formData.phone, formData.message, isAgreed);
      alert('Форма отправлена');
      setFormData({
        name: '',
        phone: '',
        message: '',
      });
      setIsAgreed(false);

      setTimeout(() => {
        setOpenSV(false);
      }, 1000);
    }
  };
  return (
    <div className={styles.feedbackDiv}>
      <section className={styles.feedback}>
        <h1>Обратная связь</h1>

        <svg
          onClick={() => setOpenSV(false)}
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 20L4 4.00003M20 4L4.00002 20"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>

        <form onSubmit={handleSubmit}>
          <div className={styles.NameBlock}>
            <div className={styles.Name}>
              <h2>ИМЯ</h2>
              <input
                type="text"
                placeholder="Имя"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className={styles.errors}>{errors.name}</p>}
          </div>
          <div className={styles.PhoneBlock}>
            <div className={styles.Phone}>
              <h2>КОНТАКТНЫЕ ДАННЫЕ</h2>
              <input
                type="tel"
                placeholder="Телефон"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && <p className={styles.errors}>{errors.phone}</p>}
          </div>
          <textarea
            type="text"
            placeholder="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className={styles.errors}>{errors.message}</p>}
          <div className={styles.Check}>
            <input type="checkbox" checked={isAgreed} onChange={handleCheckboxChange} />
            <label htmlFor="agreement">Согласие на обработку персональных данных</label>
          </div>
          {errors.agreement && <p className={styles.errors}>{errors.agreement}</p>}
          <div className={styles.btnSub}>
            <button type="submit">Отправить</button>
          </div>
        </form>
      </section>
    </div>
  );
};
