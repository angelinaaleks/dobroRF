import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

export const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Навигационные пункты
  const navItems = [
    { path: '/', label: 'Главная', isAnchor: false },
    { path: '/about', label: 'О центре', isAnchor: false },
    { path: '/youth-life', label: 'Молодёжная жизнь', isAnchor: false },
    { path: '/map', label: 'Карта добрых мест', isAnchor: false },
    { path: '/ideas', label: 'Копилка идей', isAnchor: false },
    { path: '/hall-of-fame', label: 'Зал славы', isAnchor: false },
    { path: '/contacts', label: 'Контакты', isAnchor: true },
  ];

  const currentPage =
    navItems.find((item) => item.path === location.pathname && !item.isAnchor)?.label || 'Главная';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest(`.${styles.moreDropdown}`)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  const scrollToFooter = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    setOpen(false);
    setMobileMenuOpen(false);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onClickLink = (e, path) => {
    //e.preventDefault();
    setOpen(false);
    if (location.pathname === path) {
      scrollToTop(e);
    } else {
      window.location.href = path;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.head}>
          {/* Десктопная навигация */}
          {!isMobile && (
            <div className={styles.desktopNav}>
              {/* "Гланая" */}
              <div onClick={scrollToTop} className={styles.navButton}>
                {currentPage.toUpperCase()}
              </div>

              {/* Логотип */}
              <Link to="/" className={styles.logoLink}>
                <div className={styles.logoIcon}>
                  <img src="/images/logo.png" />
                </div>
              </Link>

              {/* Выпадающее меню "Ещё" */}
              <div className={styles.moreDropdown}>
                <button
                  className={`${styles.navButton} ${styles.moreButton} ${open ? styles.open : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}>
                  ЕЩЁ
                  <svg className={styles.arrowIcon} width="12" height="12" viewBox="0 0 12 12">
                    {open ? (
                      <path d="M6 4L10 8H2L6 4Z" fill="currentColor" /> // Стрелка вверх
                    ) : (
                      <path d="M6 8L2 4H10L6 8Z" fill="currentColor" /> // Стрелка вниз
                    )}
                  </svg>
                </button>

                {open && (
                  <div className={styles.dropdownMenu}>
                    {navItems.map((item) =>
                      item.isAnchor ? (
                        // Для контактов - кнопка с скроллом
                        <button
                          key={item.path}
                          onClick={scrollToFooter}
                          className={styles.dropdownItem}>
                          {item.label}
                        </button>
                      ) : (
                        // Для остальных - обычная ссылка
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`${styles.dropdownItem} ${location.pathname === item.path ? styles.active : ''}`}
                          onClick={(e) => onClickLink(e, item.path)}>
                          {item.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Бургер-меню для мобильных */}
          {isMobile && (
            <div className={styles.mobileNav}>
              {/* Логотип */}
              <Link to="/" className={styles.logoLink}>
                <div className={styles.logoIcon}>
                  <img src="images/logo.png" />
                </div>
              </Link>
              <button
                className={styles.burgerButton}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span className={`${styles.burgerLine} ${mobileMenuOpen ? styles.open : ''}`} />
                <span className={`${styles.burgerLine} ${mobileMenuOpen ? styles.open : ''}`} />
                <span className={`${styles.burgerLine} ${mobileMenuOpen ? styles.open : ''}`} />
              </button>
            </div>
          )}
        </div>

        {/* Мобильное меню */}
        {isMobile && mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {navItems.map((item) =>
              item.isAnchor ? (
                <button
                  key={item.path}
                  onClick={scrollToFooter}
                  className={`${styles.mobileMenuItem}`}>
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.mobileMenuItem} ${location.pathname === item.path ? styles.active : ''}`}
                  onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              ),
            )}
            <div className={styles.mobileSocialIcons}>
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                VK
              </a>
              <a href="https://max.ru" target="_blank" rel="noopener noreferrer">
                Max
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
