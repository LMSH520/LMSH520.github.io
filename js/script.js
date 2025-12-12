// 动态设置最后更新日期
function setLastUpdatedDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Shanghai'
    };
    document.getElementById('last-updated').textContent = now.toLocaleDateString('zh-CN', options);
}

// 初始化动画效果
function initAnimations() {
    // 滚动动画
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section, .job, .project, .education-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 初始化元素样式
    const elements = document.querySelectorAll('.section, .job, .project, .education-item');
    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 首次执行
    animateOnScroll();
    
    // 滚动时执行
    window.addEventListener('scroll', animateOnScroll);
}

// 暗色模式切换
function setupDarkMode() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const setDarkMode = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };
    
    // 根据系统设置初始化
    setDarkMode(darkModeMediaQuery.matches);
    
    // 监听系统设置变化
    darkModeMediaQuery.addEventListener('change', e => {
        setDarkMode(e.matches);
    });
    
    // 添加暗色模式的CSS变量
    const style = document.createElement('style');
    style.textContent = `
        .dark-mode {
            --text-color: #e9ecef;
            --light-text: #adb5bd;
            --background-light: #2d3138;
            --border-color: #495057;
        }
        
        .dark-mode .container {
            background-color: #212529;
            color: var(--text-color);
        }
        
        .dark-mode .section-title {
            border-bottom-color: var(--border-color);
        }
        
        .dark-mode .skill-item {
            background-color: #343a40;
        }
        
        .dark-mode .project {
            background-color: #2d3138;
        }
        
        .dark-mode .job {
            border-bottom-color: var(--border-color);
        }
        
        .dark-mode .footer {
            background-color: #2d3138;
        }
        
        .dark-mode .contact-info a {
            color: rgba(255, 255, 255, 0.85);
        }
    `;
    document.head.appendChild(style);
}

// 打印优化
function setupPrintStyles() {
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
                border-radius: 0;
            }
            
            .profile-header {
                background: linear-gradient(135deg, #4361ee, #3f37c9) !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .contact-info a {
                color: white !important;
                text-decoration: none;
            }
            
            footer {
                break-inside: avoid;
            }
            
            .no-print {
                display: none;
            }
        }
    `;
    document.head.appendChild(printStyle);
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    setLastUpdatedDate();
    initAnimations();
    setupDarkMode();
    setupPrintStyles();
});
