export type Locale = "ru" | "en" | "zh";

export type CaseGroupKind = "infra" | "ai";

export type TimelineItem = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  logo?: string;
  logoIcon?: "Lock" | "FileLock" | "Shield" | "HelpCircle";
  location?: string;
};

export type CaseStudy = {
  group: CaseGroupKind;
  /** Адрес отдельной страницы кейса. Общий для всех локалей. */
  slug: string;
  title: string;
  impact: string;
  stack: string[];
  summary: string;
};

export type Pillar = {
  label: string;
  intro: string;
  /** Ядро — видно всегда. Держим ~9 позиций на группу. */
  body: string;
  /** Глубина — раскрывается по наведению или нажатию. В HTML присутствует всегда. */
  more?: string;
};

export type ProfileBundle = {
  profile: {
    name: string;
    role: string;
    roleSubline: string;
    email: string;
    phone: string;
    telegram: string;
    summary: string;
    status: string;
    desiredRole: string;
  };
  nav: {
    projects: string;
    experience: string;
    contact: string;
  };
  hero: {
    primaryCta: string;
    secondaryCta: string;
    pillars: Pillar[];
  };
  caseStudies: CaseStudy[];
  caseGroups: {
    infra: { eyebrow: string; title: string };
    ai: { eyebrow: string; title: string };
  };
  timeline: TimelineItem[];
  education: TimelineItem[];
  contactFormat: string;
  contactLocation: string;
  sectionTitles: {
    projectsEyebrow: string;
    projectsTitle: string;
    experienceEyebrow: string;
    experienceTitle: string;
    educationEyebrow: string;
    contactEyebrow: string;
    contactTitle: string;
  };
  meta: {
    title: string;
    description: string;
  };
};

export const profileByLocale: Record<Locale, ProfileBundle> = {
  ru: {
    profile: {
      name: "Олег Темпалов",
      role: "Архитектор IT-инфраструктуры",
      roleSubline: "Инфраструктура · Автоматизация · AI-агенты",
      email: "oleg@tempalov.ru",
      phone: "+7 (922) 222-58-00",
      telegram: "https://t.me/tempalov",
      summary:
        "Полный цикл — от серверной до AI-агентов в продакшене. Под ключ.",
      status:
        "Открыт к ролям архитектора инфраструктуры и Head of Infrastructure. Удалённо, full-time или долгосрочный контракт. Готов к NDA-проектам.",
      desiredRole: "Архитектор IT-инфраструктуры",
    },
    nav: {
      projects: "Кейсы",
      experience: "Опыт",
      contact: "Контакты",
    },
    hero: {
      primaryCta: "Смотреть кейсы",
      secondaryCta: "Связаться",
      pillars: [
        {
          label: "Системы, Active Directory и почта",
          intro:
            "Ядро корпоративной инфраструктуры — от гипервизора до единого входа.",
          body: "VMware ESXi · vCenter · Proxmox · Veeam · MS Exchange (DAG) · AD DS · Windows Server · Keycloak · Zabbix",
          more: "Postfix · Dovecot · mailcow · PMG · AD CS · AD FS · DFS · WSUS · WEC · SCCM · RDS+FSLogix · Telegraf · InfluxDB",
        },
        {
          label: "Сети, прокси и безопасность",
          intro:
            "Связываю площадки в единый контур и держу периметр.",
          body: "MikroTik · WireGuard · OSPF · IPSec · GRE · angie · nginx · HAProxy · Wazuh",
          more: "Ubiquiti · pfSense · OPNsense · OpenVPN · Traefik · Caddy · CrowdSec · ModSecurity · Cloudflare WAF · Suricata · Graylog",
        },
        {
          label: "Облака и автоматизация",
          intro:
            "Всё повторяющееся — в код: IaC, конфигурации, контейнеры.",
          body: "Yandex Cloud · VK Cloud · Terraform · Ansible · Docker · GitLab CI · Python · PowerShell · Bash",
          more: "Selectel · cloud.ru · Timeweb · PowerShell DSC · cloud-init · Ruby",
        },
        {
          label: "AI-агенты",
          intro:
            "Встраиваю LLM так, чтобы польза была в проде, а не в презентации.",
          body: "OpenAI · Anthropic · MCP · vector DBs · LangChain · agentic workflows",
        },
      ],
    },
    caseGroups: {
      infra: {
        eyebrow: "Инфраструктура и эксплуатация",
        title: "Инфраструктура и эксплуатация",
      },
      ai: {
        eyebrow: "Автоматизация и AI-агенты",
        title: "Автоматизация и AI-агенты",
      },
    },
    caseStudies: [
      {
        group: "infra",
        slug: "enterprise-infrastructure-from-scratch",
        title: "Enterprise-инфраструктура с нуля",
        impact:
          "4 площадки в 2 странах · 100–200 пользователей · 50+ серверов · mail/AD/networking + cert automation, собрано solo под ключ",
        stack: [
          "Exchange + DAG",
          "PMG",
          "HAProxy + SNI",
          "MikroTik RouterOS 7",
          "WireGuard + GRE",
          "OSPF + FRR",
          "ACME → Exchange",
        ],
        summary:
          "Спроектировал и построил корпоративную инфраструктуру для крупного заказчика с нуля: AD, Exchange с DAG между площадками, почтовый конвейер через PMG + HAProxy с SNI-роутингом, маршрутизация между площадками на WireGuard + GRE + OSPF + FRR, MikroTik RouterOS 7, автоматизация сертификатов ACME → Exchange. Трекинг сообщений, пригодный для расследования инцидентов, BookStack для документации. Под ключ, без передачи на стороны.",
      },
      {
        group: "infra",
        slug: "active-directory-modernization",
        title: "Модернизация Active Directory",
        impact: "Windows Server 2008 → 2022, 3 страны, мульти-сайт репликация, слияние доменов",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "Перевёл унаследованный AD-лес на актуальную версию и единую структуру: распределение ролей по трём площадкам, миграция объектов из нескольких доменов в один, предсказуемая репликация и снижение операционного риска.",
      },
      {
        group: "infra",
        slug: "active-directory-gpo-audit",
        title: "Гигиена Active Directory: аудит и починка GPO",
        impact:
          "Аудит и починка GPO/ACL на большом унаследованном лесу, phased rollout с возможностью отката",
        stack: [
          "PowerShell",
          "Active Directory",
          "Group Policy",
          "GPOZaurr",
          "NetLogon ACL",
          "Security Filtering",
        ],
        summary:
          "Провёл операционный аудит и ремонт GPO и ACL на большом унаследованном AD-лесу: 17 PowerShell-скриптов для выявления битых политик, восстановления Security Filtering после массового даунгрейда на Authenticated Users, аккуратной чистки NetLogon ACE через pre-flight проверку и поэтапное развёртывание (Phase 1/2/3). Каждое изменение — с бэкапом и путём отката. Финальные отчёты — на масштабе сотен GPO.",
      },
      {
        group: "infra",
        slug: "keycloak-angie-2fa-exchange",
        title: "2FA / SSO для корпоративной почты на Keycloak + ANGIE",
        impact:
          "Свой 2FA-провайдер на Keycloak, SSO на уровне web-сервера для OWA и Outlook-клиентов",
        stack: [
          "Keycloak",
          "ANGIE",
          "MS Exchange",
          "OWA",
          "Outlook",
          "OIDC",
          "TOTP",
        ],
        summary:
          "Спроектировал и внедрил кастомный 2FA-провайдер на базе Keycloak для доступа к корпоративной почте. ANGIE стоит фронтом перед OWA и Outlook-клиентами и обеспечивает SSO на уровне веб-сервера. 2FA проходит на стороне Keycloak без правки внутренних сервисов Exchange. Запущено в прод, ходит весь корпоративный поток.",
      },
      {
        group: "infra",
        slug: "virtualization-vcenter",
        title: "Виртуализация и vCenter",
        impact: "Hyper-V → ESXi, ESXi 5 → 6.7, vCenter 7, кластер на ~15 bare-metal",
        stack: ["VMware ESXi", "vCenter", "Hyper-V", "Proxmox", "vCloud Director"],
        summary:
          "Консолидировал виртуализацию на VMware, конвертировал виртуальные машины с Hyper-V, поднял vCenter 7 и отказоустойчивый vSphere-кластер. Параллельно работал с облаком на vCloud Director.",
      },
      {
        group: "infra",
        slug: "distributed-veeam-drp",
        title: "Распределённый Veeam и DRP",
        impact: "Backup на трёх площадках, автоматическое копирование конфигов, DRP",
        stack: ["Veeam B&R", "Synology", "TrueNAS", "NextCloud", "rsync"],
        summary:
          "Выстроил распределённую систему резервного копирования на трёх площадках: полный Veeam-контур для виртуалок, автоматическое копирование конфигураций сетевого оборудования и документированный disaster recovery plan.",
      },
      {
        group: "infra",
        slug: "office-datacenter-networking",
        title: "Сеть между офисами и ЦОД",
        impact: "Site-to-site IPSec, резервные каналы, −66% затрат на интернет",
        stack: ["MikroTik", "Ubiquiti", "TP-Link", "IPSec", "OpenVPN", "VLAN"],
        summary:
          "Объединил несколько офисов и два ЦОД в единый управляемый контур через site-to-site IPSec VPN, переосмыслил каналы до ЦОД на MikroTik и OpenVPN, и пересобрал сетевое оборудование — расходы на интернет-связность упали примерно на две трети.",
      },
      {
        group: "infra",
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana и автоматизация",
        impact: "Единый мониторинг с прокси в филиалах и автоматизация рутины",
        stack: ["Zabbix", "Grafana", "Python", "PowerShell", "Bash", "Docker"],
        summary:
          "Собрал Zabbix с прокси-серверами в удалённых сетях и Grafana-дашборды для быстрой диагностики. Автоматизировал типовые задачи администрирования скриптами на Python, PowerShell и Bash и разворачивал сервисы в Docker / Docker Compose.",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "Multi-agent workflow для разработки в соло",
        impact:
          "3 специализированных AI-агента + MCP Memory Server: spec, код и review без переключения контекста",
        stack: ["Claude", "MCP", "MCP Memory Server", "Multi-agent", "Knowledge graph"],
        summary:
          "Спроектировал и собрал multi-agent workflow для разработки сложной системы в соло: три специализированных AI-агента (стратегический консультант · keeper knowledge-vault · разработчик в IDE) общаются через MCP Memory Server и shared knowledge layer. Каждый агент имеет свою роль, ограничения и контекст; vault хранит ADR и решения; memory server — рабочий контекст и состояние подсистем.",
      },
      {
        group: "ai",
        slug: "realtime-voice-agent-pbx",
        title: "Realtime voice-агент на корпоративной ВАТС",
        impact:
          "Живой разговор LLM с клиентом по корпоративной ВАТС, retrieval по базе знаний, эскалация при неоднозначности",
        stack: ["OpenAI Realtime API", "SIP", "ВАТС", "RAG", "Python"],
        summary:
          "Построил голосового агента, отвечающего в реальном времени на вопросы клиентов по базе знаний и продуктам через корпоративную ВАТС. Realtime-модель ведёт естественный разговор без пауз, тянет ответы из retrieval-слоя по базе знаний, эскалирует на человека при неоднозначности. Не «LLM анализирует записи постфактум», а «LLM сам разговаривает с клиентом в моменте».",
      },
      {
        group: "ai",
        slug: "llm-call-analysis-bi-crm",
        title: "LLM-анализ звонков и BI/CRM pipeline",
        impact: "Выгрузка в BI на Python и автоматический разбор разговоров GPT-4",
        stack: ["Asterisk", "FreePBX", "MikoPBX", "ВАТС Мегафон", "Python", "ChatGPT API"],
        summary:
          "Настроил и сопровождал корпоративную АТС и ВАТС Мегафон, оптимизировал расходы на сотовую и интернет-связь. Написал выгрузку статистики на Python для BI и подключил GPT-4 к анализу разговоров с отчётом руководителю в CRM.",
      },
    ],
    timeline: [
      {
        company: "Детский Мир",
        logo: "https://www.google.com/s2/favicons?domain=detmir.ru&sz=64",
        role: "Senior SysOps",
        period: "Октябрь 2023 — настоящее время",
        location: "Москва",
        highlights: [
          "Модернизация корпоративной инфраструктуры enterprise-масштаба: обновление Linux-стека, AD-лес в трёх странах, VMware.",
          "Промышленный мониторинг с нуля до прод-контура на тысячи объектов: собственные шаблоны, прокси-сеть в филиалах, автоматизированный деплой агентов в магазинах.",
          "Единый источник правды по всей инфраструктуре: автоматическое наполнение скриптовыми сканерами (Ansible / Bash / PowerShell), синхронизация с системами виртуализации; агенты и конфигурации разворачиваются из него.",
          "Слой обратных прокси для критичных корпоративных сервисов: балансировка, SSO на уровне веб-сервера для корпоративной почты.",
        ],
      },
      {
        company: "Корпоративный клиент (NDA)",
        logoIcon: "Lock",
        role: "Solutions Architect · контракт",
        period: "2024 — настоящее время",
        location: "Москва",
        highlights: [
          "Спроектировал и построил корпоративную инфраструктуру с нуля: AD, Exchange + DAG.",
          "Маршрутизация между площадками на WireGuard + GRE + OSPF + FRR, MikroTik RouterOS 7.",
          "Почтовый конвейер через PMG + HAProxy с SNI-роутингом.",
          "Автоматизация сертификатов ACME → Exchange. Параллельно с основной ролью.",
        ],
      },
      {
        company: "Лето Недвижимость",
        logo: "https://www.google.com/s2/favicons?domain=leto-realty.ru&sz=64",
        role: "Руководитель IT-отдела",
        period: "Июнь 2021 — Сентябрь 2023",
        location: "Сочи",
        highlights: [
          "IT-функция целиком на мне: бюджет, подрядчики, закупки, договоры.",
          "RDS-ферма HA, FSLogix, ВАТС, внутренняя сеть на MikroTik / TP-Link / UniFi.",
          "Site-to-site IPSec VPN между офисами и ЦОД, каналы до ЦОД на MikroTik и OpenVPN.",
          "Инфраструктура в двух странах: два ЦОД и 4 удалённых офиса.",
          "Миграция Hyper-V → ESXi, ESXi 5 → 6.7, запуск vCenter 7, распределённый Veeam на трёх площадках.",
          "Обновление AD с Windows Server 2008 до 2022 и консолидация доменов.",
          "MS Exchange, WSUS, Zabbix, OpenVPN, Nextcloud, WTware — внедрение и эксплуатация.",
          "Python-автоматизация и подключение GPT-4 к анализу разговоров ВАТС с отчётом в CRM.",
          "Снижение расходов на интернет-связность примерно на две трети.",
          "Менторинг трёх системных администраторов в удалённых офисах.",
        ],
      },
      {
        company: "Цифровые системы",
        logo: "https://www.google.com/s2/favicons?domain=cgood.ru&sz=64",
        role: "Старший системный администратор",
        period: "Июнь 2020 — Май 2021",
        location: "Сочи",
        highlights: [
          "Проектирование и эксплуатация отказоустойчивого VMware-кластера на ~15 bare-metal серверах (vSphere 6.7–7).",
          "Облако на базе vCloud Director и распределённая система резервного копирования.",
          "Windows и Linux: CentOS, Ubuntu Server, Debian; Hyper-V, ESXi, Proxmox.",
          "Сети: MikroTik, Eltex, Ubiquiti, TP-Link Enterprise; VLAN, RADIUS, WLAN, ACL; VPN на pfSense / OPNsense / MikroTik.",
          "Zabbix (сервер + прокси), Grafana, Veeam B&R, резервное копирование конфигов.",
          "1С серверный вариант, MS Exchange 2016–2019 (DAG), MailCow, MikoPBX, Asterisk, FreePBX.",
          "Документация: регламенты, инструкции, DRP, ТЗ. Постановка и контроль задач младшим коллегам.",
        ],
      },
      {
        company: "Gift66 (ekb.gifts) · ИП",
        logo: "/logos/gift66.png",
        role: "Founder · e-commerce",
        period: "2015 — 2018",
        location: "Екатеринбург",
        highlights: [
          "Собственный интернет-магазин подарков и подарочных сертификатов «Gift66» в Екатеринбурге.",
          "Полный цикл: создание, открытие, маркетинг и продвижение, в итоге закрытие.",
          "Параллельно с инженерной работой: P&L, маркетинг, операционка. Помогает читать бизнес-задачи заказчика, не только тикеты.",
        ],
      },
      {
        company: "СКБ Контур",
        logo: "https://www.google.com/s2/favicons?domain=kontur.ru&sz=64",
        role: "Системный администратор · инженер",
        period: "2014 — 2017",
        location: "Екатеринбург",
        highlights: [
          "Переход от аутсорса к работе внутри одной из крупнейших российских IT-компаний.",
          "Инженерные задачи на enterprise-масштабе, продуктовая среда.",
        ],
      },
      {
        company: "Fresh Support · IT-аутсорсинг",
        logo: "https://www.google.com/s2/favicons?domain=freshsupport.ru&sz=64",
        role: "Специалист поддержки",
        period: "2012 — 2014",
        location: "Екатеринбург",
        highlights: [
          "Среди клиентов: телеканал MTV (позже — «Пятница») и несколько радиостанций.",
          "Диагностика и устранение сбоев по всему фронту: инфраструктура, сети, телефония, поддержка пользователей.",
        ],
      },
    ],
    education: [
      {
        company: "Skillbox · онлайн-обучение",
        logo: "https://www.google.com/s2/favicons?domain=skillbox.ru&sz=64",
        role: "Профессия «DevOps Engineer Pro»",
        period: "Дополнительное образование",
        highlights: [
          "Контейнеризация: Docker, Docker Compose.",
          "Оркестрация: Kubernetes.",
          "Infrastructure as Code: Terraform, Ansible.",
          "CI/CD: GitLab CI, GitHub Actions.",
          "Облака, мониторинг, SRE-практики.",
        ],
      },
    ],
    contactFormat: "Только удалённо. Без офиса и командировок.",
    contactLocation: "Москва · UTC+3",
    sectionTitles: {
      projectsEyebrow: "Кейсы",
      projectsTitle: "Кейсы, где видно архитектора",
      experienceEyebrow: "Опыт",
      experienceTitle: "12+ лет",
      educationEyebrow: "Курсы",
      contactEyebrow: "Контакты",
      contactTitle:
        "Если нужен архитектор, который доводит сложную инфраструктуру до прода и потом её же эксплуатирует — напишите.",
    },
    meta: {
      title: "Олег Темпалов — архитектор IT-инфраструктуры",
      description:
        "12+ лет в корпоративной инфраструктуре. Solutions Architect: проектирую системы Linux/Windows на архитекторском уровне, автоматизирую бизнес-процессы агентными системами, интегрирую LLM в продакшен. Только удалённо.",
    },
  },
  en: {
    profile: {
      name: "Oleg Tempalov",
      role: "IT Infrastructure Architect",
      roleSubline: "Infrastructure · Automation · AI agents",
      email: "oleg@tempalov.ru",
      phone: "+7 (922) 222-58-00",
      telegram: "https://t.me/tempalov",
      summary:
        "End-to-end infrastructure — from bare metal and networks to AI agents running in production.",
      status:
        "Open to Infrastructure Architect, Solutions Architect or Head of Infrastructure roles. Remote, full-time or contract.",
      desiredRole: "IT Infrastructure Architect",
    },
    nav: {
      projects: "Results",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      primaryCta: "View results",
      secondaryCta: "Get in touch",
      pillars: [
        {
          label: "Systems, identity and mail",
          intro:
            "The core of corporate infrastructure — hypervisor to single sign-on.",
          body: "VMware ESXi · vCenter · Proxmox · Veeam · MS Exchange (DAG) · AD DS · Windows Server · Keycloak · Zabbix",
          more: "Postfix · Dovecot · mailcow · PMG · AD CS · AD FS · DFS · WSUS · WEC · SCCM · RDS+FSLogix · Telegraf · InfluxDB",
        },
        {
          label: "Networking, proxies and security",
          intro:
            "I tie sites into one fabric and hold the perimeter.",
          body: "MikroTik · WireGuard · OSPF · IPSec · GRE · angie · nginx · HAProxy · Wazuh",
          more: "Ubiquiti · pfSense · OPNsense · OpenVPN · Traefik · Caddy · CrowdSec · ModSecurity · Cloudflare WAF · Suricata · Graylog",
        },
        {
          label: "Cloud and automation",
          intro:
            "Anything repetitive becomes code: IaC, configs, containers.",
          body: "Yandex Cloud · VK Cloud · AWS · GCP · Azure · Terraform · Ansible · Docker · Python · PowerShell",
          more: "Selectel · cloud.ru · Timeweb · PowerShell DSC · cloud-init · GitLab CI · Bash · Ruby",
        },
        {
          label: "AI agents",
          intro:
            "I wire LLMs in so they pay off in production, not in slide decks.",
          body: "OpenAI · Anthropic · MCP · vector DBs · LangChain · agentic workflows",
        },
      ],
    },
    caseGroups: {
      infra: {
        eyebrow: "Infrastructure & operations",
        title: "Infrastructure and operations",
      },
      ai: {
        eyebrow: "Automation & AI agents",
        title: "Automation and AI agents",
      },
    },
    caseStudies: [
      {
        group: "infra",
        slug: "enterprise-infrastructure-from-scratch",
        title: "Enterprise infrastructure from scratch",
        impact:
          "4 sites in 2 countries · 100–200 users · 50+ servers · mail/AD/networking + cert automation, built solo turnkey",
        stack: [
          "Exchange + DAG",
          "PMG",
          "HAProxy + SNI",
          "MikroTik RouterOS 7",
          "WireGuard + GRE",
          "OSPF + FRR",
          "ACME → Exchange",
        ],
        summary:
          "Designed and built corporate infrastructure for a large client from scratch: AD, Exchange with DAG between sites, mail pipeline via PMG + HAProxy with SNI routing, multi-site routing on WireGuard + GRE + OSPF + FRR, MikroTik RouterOS 7, ACME → Exchange cert automation pipeline. Audit-grade message tracking, BookStack for internal docs. End-to-end ownership, no handoffs.",
      },
      {
        group: "infra",
        slug: "active-directory-modernization",
        title: "Active Directory modernization",
        impact:
          "Windows Server 2008 → 2022, three sites, multi-site replication, merged domains",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "Moved the legacy AD forest onto a current version and a unified structure: role distribution across three sites, object migration from multiple domains into one, predictable replication, and reduced operational risk.",
      },
      {
        group: "infra",
        slug: "active-directory-gpo-audit",
        title: "Active Directory hygiene: GPO audit and repair",
        impact:
          "Operational audit and repair of GPO/ACL on a large legacy forest, phased rollback-safe rollout",
        stack: [
          "PowerShell",
          "Active Directory",
          "Group Policy",
          "GPOZaurr",
          "NetLogon ACL",
          "Security Filtering",
        ],
        summary:
          "Ran operational audit and repair of GPO and ACL across a large legacy AD forest: 17 PowerShell scripts to detect broken policies, restore Security Filtering after a mass downgrade to Authenticated Users, cleanly remove stale NetLogon ACEs via pre-flight checks and phased rollout (Phase 1/2/3). Every change had a backup and rollback path. Final reports across hundreds of GPOs.",
      },
      {
        group: "infra",
        slug: "keycloak-angie-2fa-exchange",
        title: "2FA / SSO for corporate mail with Keycloak + ANGIE",
        impact:
          "Custom Keycloak-based 2FA provider, SSO at the web-server layer for OWA and Outlook clients",
        stack: [
          "Keycloak",
          "ANGIE",
          "MS Exchange",
          "OWA",
          "Outlook",
          "OIDC",
          "TOTP",
        ],
        summary:
          "Designed and rolled out a custom Keycloak-based 2FA provider for corporate mail access. ANGIE sits in front of OWA and Outlook clients and handles SSO at the web-server layer. 2FA runs on the Keycloak side without touching Exchange internals. Running in production today, handling all corporate mail traffic.",
      },
      {
        group: "infra",
        slug: "virtualization-vcenter",
        title: "Virtualization and vCenter",
        impact: "Hyper-V → ESXi, ESXi 5 → 6.7, vCenter 7, ~15 bare-metal cluster",
        stack: ["VMware ESXi", "vCenter", "Hyper-V", "Proxmox", "vCloud Director"],
        summary:
          "Consolidated virtualization on VMware, converted VMs from Hyper-V, brought up vCenter 7, and operated a fault-tolerant vSphere cluster. Worked alongside a vCloud Director-based cloud.",
      },
      {
        group: "infra",
        slug: "distributed-veeam-drp",
        title: "Distributed Veeam and DRP",
        impact: "Backup on three sites, automated config backups, DRP",
        stack: ["Veeam B&R", "Synology", "TrueNAS", "NextCloud", "rsync"],
        summary:
          "Built a distributed backup system across three sites: full Veeam coverage for VMs, automated backups of network equipment configurations, and a documented disaster recovery plan.",
      },
      {
        group: "infra",
        slug: "office-datacenter-networking",
        title: "Office-to-DC networking",
        impact: "Site-to-site IPSec, redundant channels, ~66% lower internet cost",
        stack: ["MikroTik", "Ubiquiti", "TP-Link", "IPSec", "OpenVPN", "VLAN"],
        summary:
          "Connected multiple offices and two data centers into a single managed environment via site-to-site IPSec VPN, rebuilt channels to the DCs on MikroTik and OpenVPN, and reworked network equipment — dropping internet connectivity costs by roughly two-thirds.",
      },
      {
        group: "infra",
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana and automation",
        impact: "Unified monitoring with branch proxies and routine work automated",
        stack: ["Zabbix", "Grafana", "Python", "PowerShell", "Bash", "Docker"],
        summary:
          "Set up Zabbix with proxies in remote networks and Grafana dashboards for fast diagnostics. Automated typical admin tasks with Python, PowerShell, and Bash scripts, and deployed services in Docker / Docker Compose.",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "Multi-agent workflow for solo development",
        impact:
          "3 specialized AI agents + MCP Memory Server: spec, code, and review without context-switching",
        stack: ["Claude", "MCP", "MCP Memory Server", "Multi-agent", "Knowledge graph"],
        summary:
          "Designed and built a multi-agent workflow for solo development of a complex system: three specialized AI agents (strategic consultant · knowledge-vault keeper · in-IDE developer) communicate through an MCP Memory Server and a shared knowledge layer. Each agent has its own role, constraints, and context; the vault stores ADRs and decisions; the memory server carries working context and subsystem state.",
      },
      {
        group: "ai",
        slug: "realtime-voice-agent-pbx",
        title: "Realtime voice agent over a cloud PBX",
        impact:
          "Live LLM conversation with customers over a cloud PBX, retrieval over KB, escalation on ambiguity",
        stack: ["OpenAI Realtime API", "SIP", "Cloud PBX", "RAG", "Python"],
        summary:
          "Built a voice agent answering customer questions in real time, sourced from a knowledge base and product catalog, over a cloud PBX. The realtime model holds a natural conversation, pulls answers from a retrieval layer over the KB, and escalates to a human on ambiguity. Not post-call analysis of recordings — the LLM is on the line with the customer in real time.",
      },
      {
        group: "ai",
        slug: "llm-call-analysis-bi-crm",
        title: "LLM call analysis and BI/CRM pipeline",
        impact: "BI exports from the virtual PBX and automatic GPT-4 call review",
        stack: ["Asterisk", "FreePBX", "MikoPBX", "Megafon PBX", "Python", "ChatGPT API"],
        summary:
          "Ran the corporate PBX and Megafon virtual PBX, optimized mobile and internet costs. Wrote Python exporters that fed BI and integrated GPT-4 to analyze call content with a report pushed back into the CRM.",
      },
    ],
    timeline: [
      {
        company: "Detsky Mir (large retail chain, ~30K employees)",
        logo: "https://www.google.com/s2/favicons?domain=detmir.ru&sz=64",
        role: "Senior SysOps",
        period: "October 2023 — Present",
        location: "Moscow",
        highlights: [
          "Modernization of corporate infrastructure at enterprise scale: Linux stack overhaul, AD forest across three countries, VMware estate.",
          "Production monitoring built from scratch to prod-ready coverage across thousands of objects: custom templates, proxy fleet across branches, automated agent deployment in stores.",
          "Source of truth for the whole infrastructure auto-populated by Ansible / Bash / PowerShell scanners and synced from virtualization platforms; agents and configs roll out from the source of truth.",
          "Reverse-proxy layer for critical corporate services: load balancing, SSO at the web-server layer for corporate mail.",
        ],
      },
      {
        company: "Enterprise client (NDA)",
        logoIcon: "Lock",
        role: "Solutions Architect · engagement",
        period: "2024 — Present",
        location: "Moscow",
        highlights: [
          "Designed and built corporate infrastructure from scratch: AD, Exchange + DAG.",
          "Multi-site routing on WireGuard + GRE + OSPF + FRR, MikroTik RouterOS 7.",
          "Mail pipeline via PMG + HAProxy with SNI routing.",
          "ACME → Exchange cert automation pipeline. In parallel with primary role.",
        ],
      },
      {
        company: "Leto Realty (real-estate group, 2 countries / 4 offices)",
        logo: "https://www.google.com/s2/favicons?domain=leto-realty.ru&sz=64",
        role: "Head of IT",
        period: "June 2021 — September 2023",
        location: "Sochi",
        highlights: [
          "Owned the IT function end-to-end: budget, vendors, procurement, contracts.",
          "HA RDS farm, FSLogix, virtual PBX, internal network on MikroTik / TP-Link / UniFi.",
          "Site-to-site IPSec VPN between offices and data centers, DC uplinks on MikroTik and OpenVPN.",
          "Infrastructure across two countries: two DCs and 4 remote offices.",
          "Hyper-V → ESXi migration, ESXi 5 → 6.7 upgrade, vCenter 7 rollout, distributed Veeam across three sites.",
          "AD upgrade from Windows Server 2008 to 2022 and domain consolidation.",
          "Deployed and ran MS Exchange, WSUS, Zabbix, OpenVPN, Nextcloud, WTware thin clients.",
          "Python automation and GPT-4-based call analysis with reports pushed into the CRM.",
          "Cut internet connectivity costs by roughly two-thirds.",
          "Mentored three system administrators in remote offices.",
        ],
      },
      {
        company: "Digital Systems (regional cloud and managed-services provider)",
        logo: "https://www.google.com/s2/favicons?domain=cgood.ru&sz=64",
        role: "Senior System Administrator",
        period: "June 2020 — May 2021",
        location: "Sochi",
        highlights: [
          "Designed and operated a fault-tolerant VMware cluster on ~15 bare-metal servers (vSphere 6.7–7).",
          "vCloud Director-based cloud and a distributed backup system.",
          "Windows and Linux: CentOS, Ubuntu Server, Debian; Hyper-V, ESXi, Proxmox.",
          "Networking: MikroTik, Eltex, Ubiquiti, TP-Link Enterprise; VLAN, RADIUS, WLAN, ACL; VPN on pfSense / OPNsense / MikroTik.",
          "Zabbix (server + proxies), Grafana, Veeam B&R, automated config backups.",
          "1C server edition, MS Exchange 2016–2019 (DAG), MailCow, MikoPBX, Asterisk, FreePBX.",
          "Documentation: SOPs, runbooks, DRP, technical specs. Task assignment and mentoring for junior colleagues.",
        ],
      },
      {
        company: "Gift66 (ekb.gifts) · sole proprietor",
        logo: "/logos/gift66.png",
        role: "Founder · e-commerce",
        period: "2015 — 2018",
        location: "Yekaterinburg",
        highlights: [
          "Ran my own e-commerce store, Gift66 — gifts and gift certificates in Yekaterinburg.",
          "Full lifecycle: launch, marketing and promotion, eventual wind-down.",
          "Ran in parallel with engineering work: P&L, marketing, ops. Helps read business needs, not just tickets.",
        ],
      },
      {
        company: "SKB Kontur (one of Russia's largest B2B SaaS companies)",
        logo: "https://www.google.com/s2/favicons?domain=kontur.ru&sz=64",
        role: "System administrator · engineer",
        period: "2014 — 2017",
        location: "Yekaterinburg",
        highlights: [
          "Moved from outsourcing into one of Russia's largest IT companies as an in-house engineer.",
          "Enterprise-scale engineering tasks in a product environment.",
        ],
      },
      {
        company: "Fresh Support · IT outsourcing",
        logo: "https://www.google.com/s2/favicons?domain=freshsupport.ru&sz=64",
        role: "Support",
        period: "2012 — 2014",
        location: "Yekaterinburg",
        highlights: [
          "Clients included MTV TV channel (rebranded later as Pyatnitsa) and several radio stations.",
          "Broad troubleshooting: infrastructure, networking, telephony, user support.",
        ],
      },
    ],
    education: [
      {
        company: "Skillbox · online",
        logo: "https://www.google.com/s2/favicons?domain=skillbox.ru&sz=64",
        role: "DevOps Engineer Pro program",
        period: "Ongoing",
        highlights: [
          "Containerization: Docker, Docker Compose.",
          "Orchestration: Kubernetes.",
          "Infrastructure as Code: Terraform, Ansible.",
          "CI/CD: GitLab CI, GitHub Actions.",
          "Cloud, monitoring, SRE practices.",
        ],
      },
    ],
    contactFormat: "Remote only. No office, no travel.",
    contactLocation: "Moscow · UTC+3",
    sectionTitles: {
      projectsEyebrow: "Selected work",
      projectsTitle: "Where the architecture shows",
      experienceEyebrow: "Experience",
      experienceTitle: "12+ years",
      educationEyebrow: "Education",
      contactEyebrow: "Contact",
      contactTitle:
        "If you need an architect who takes complex infrastructure to production and then runs it — drop a line.",
    },
    meta: {
      title: "Oleg Tempalov — IT Infrastructure Architect",
      description:
        "12+ years in corporate infrastructure. Designing Linux and Windows systems at architect level, automating business processes with agent-based systems, and shipping LLMs to production. Remote only.",
    },
  },
  zh: {
    profile: {
      name: "Oleg Tempalov",
      role: "IT 基础设施架构师 · 中俄技术对接",
      roleSubline: "基础设施 · 自动化 · AI 智能体 · 跨境落地",
      email: "oleg@tempalov.ru",
      phone: "+7 (922) 222-58-00",
      telegram: "https://t.me/tempalov",
      summary:
        "从基础设施到生产级 AI 智能体,提供全链路交付。专注中俄技术对接,助力中国企业出海俄罗斯落地。",
      status:
        "面向出海俄罗斯市场的中国科技企业,提供基础设施搭建、数据本地化合规(152-ФЗ)与跨境技术对接。远程协作,接受全职或长期合同,可签署 NDA。",
      desiredRole: "IT 基础设施架构师 / 跨境技术顾问",
    },
    nav: {
      projects: "案例",
      experience: "经历",
      contact: "联系",
    },
    hero: {
      primaryCta: "查看案例",
      secondaryCta: "联系我",
      pillars: [
        {
          label: "系统、Active Directory 与邮件",
          intro:
            "企业基础设施的核心:从虚拟化平台到统一身份认证。",
          body: "VMware ESXi · vCenter · Proxmox · Veeam · MS Exchange (DAG) · AD DS · Windows Server · Keycloak · Zabbix",
          more: "Postfix · Dovecot · mailcow · PMG · AD CS · AD FS · DFS · WSUS · WEC · SCCM · RDS+FSLogix · Telegraf · InfluxDB",
        },
        {
          label: "网络、代理与安全",
          intro:
            "把多个站点连成统一网络,并守住安全边界。",
          body: "MikroTik · WireGuard · OSPF · IPSec · GRE · angie · nginx · HAProxy · Wazuh",
          more: "Ubiquiti · pfSense · OPNsense · OpenVPN · Traefik · Caddy · CrowdSec · ModSecurity · Cloudflare WAF · Suricata · Graylog",
        },
        {
          label: "俄罗斯本地云与自动化",
          intro:
            "一切重复性工作皆化为代码:IaC、配置、容器。",
          body: "Yandex Cloud · VK Cloud · AWS · GCP · Azure · Terraform · Ansible · Docker · Python · PowerShell",
          more: "Selectel · cloud.ru · Timeweb · PowerShell DSC · cloud-init · GitLab CI · Bash · Ruby",
        },
        {
          label: "AI 智能体",
          intro:
            "把 LLM 接入生产环境创造价值,而不是停留在演示里。",
          body: "OpenAI · Anthropic · MCP · Vector DB · LangChain · Agentic Workflow",
        },
      ],
    },
    caseGroups: {
      infra: {
        eyebrow: "基础设施与运维",
        title: "基础设施与运维",
      },
      ai: {
        eyebrow: "自动化与 AI 智能体",
        title: "自动化与 AI 智能体",
      },
    },
    caseStudies: [
      {
        group: "infra",
        slug: "enterprise-infrastructure-from-scratch",
        title: "从零搭建企业基础设施",
        impact:
          "2 个国家 4 个站点 · 100–200 用户 · 50+ 台服务器 · 邮件 / AD / 网络 + 证书自动化,独立完成全周期交付",
        stack: [
          "Exchange + DAG",
          "PMG",
          "HAProxy + SNI",
          "MikroTik RouterOS 7",
          "WireGuard + GRE",
          "OSPF + FRR",
          "ACME → Exchange",
        ],
        summary:
          "为大型客户从零设计并搭建企业基础设施:AD、跨站点 Exchange DAG、PMG + HAProxy SNI 路由的邮件链路、WireGuard + GRE + OSPF + FRR 的多站点路由,MikroTik RouterOS 7,ACME → Exchange 证书自动化。满足取证要求的邮件审计追溯链路,配套 BookStack 文档体系。全程独立交付,无对接断层。",
      },
      {
        group: "infra",
        slug: "active-directory-modernization",
        title: "Active Directory 现代化",
        impact:
          "Windows Server 2008 → 2022,三站点多副本复制,多域合并",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "将遗留 AD 林升级至最新版本并统一结构:跨三个站点的角色分布、多域对象迁移合并、稳定可预期的复制机制,显著降低运维风险。",
      },
      {
        group: "infra",
        slug: "active-directory-gpo-audit",
        title: "AD 治理:GPO 审计与修复",
        impact:
          "对大型遗留林进行 GPO / ACL 审计修复,分阶段安全回滚",
        stack: [
          "PowerShell",
          "Active Directory",
          "Group Policy",
          "GPOZaurr",
          "NetLogon ACL",
          "Security Filtering",
        ],
        summary:
          "对大型遗留 AD 林进行运维层面的 GPO 与 ACL 审计修复:编写 17 个 PowerShell 脚本检测异常策略,恢复 Authenticated Users 误回退后的 Security Filtering,通过预检与分阶段(Phase 1 / 2 / 3)清理 NetLogon 中过期的 ACE。每次变更均附备份与回滚方案,最终输出覆盖数百条 GPO 的完整报告。",
      },
      {
        group: "infra",
        slug: "keycloak-angie-2fa-exchange",
        title: "Keycloak + ANGIE 企业邮件 2FA / SSO",
        impact:
          "基于 Keycloak 的自定义 2FA 提供方,在 Web 层为 OWA 与 Outlook 客户端实现 SSO",
        stack: [
          "Keycloak",
          "ANGIE",
          "MS Exchange",
          "OWA",
          "Outlook",
          "OIDC",
          "TOTP",
        ],
        summary:
          "为企业邮件设计并落地基于 Keycloak 的自定义 2FA 提供方。ANGIE 位于 OWA 与 Outlook 客户端前端,在 Web 层统一处理 SSO。2FA 完全在 Keycloak 侧实现,无需侵入 Exchange 内部。已上线生产,承载全公司邮件流量。",
      },
      {
        group: "infra",
        slug: "virtualization-vcenter",
        title: "虚拟化与 vCenter",
        impact: "Hyper-V → ESXi,ESXi 5 → 6.7,vCenter 7,约 15 台裸金属集群",
        stack: ["VMware ESXi", "vCenter", "Hyper-V", "Proxmox", "vCloud Director"],
        summary:
          "在 VMware 上统一虚拟化平台,完成 Hyper-V 虚机迁移,部署 vCenter 7,运行高可用 vSphere 集群。同时运维基于 vCloud Director 的私有云。",
      },
      {
        group: "infra",
        slug: "distributed-veeam-drp",
        title: "分布式 Veeam 与 DRP",
        impact: "三站点备份,网络设备配置自动备份,完整 DRP 文档",
        stack: ["Veeam B&R", "Synology", "TrueNAS", "NextCloud", "rsync"],
        summary:
          "建设跨三个站点的分布式备份体系:VM 由 Veeam 全量覆盖,网络设备配置自动备份,DRP(灾难恢复计划)文档化。",
      },
      {
        group: "infra",
        slug: "office-datacenter-networking",
        title: "办公到数据中心网络",
        impact: "站点间 IPSec、冗余链路、互联网成本下降约 66%",
        stack: ["MikroTik", "Ubiquiti", "TP-Link", "IPSec", "OpenVPN", "VLAN"],
        summary:
          "将多个办公室与两个数据中心通过站点间 IPSec VPN 整合为统一受控环境,在 MikroTik 与 OpenVPN 上重建数据中心链路,重构网络设备,使互联网接入成本下降约三分之二。",
      },
      {
        group: "infra",
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana 与运维自动化",
        impact: "带分支代理的统一监控,日常运维流程自动化",
        stack: ["Zabbix", "Grafana", "Python", "PowerShell", "Bash", "Docker"],
        summary:
          "在分布式网络中部署 Zabbix 与代理节点,通过 Grafana 仪表盘快速定位故障。用 Python、PowerShell、Bash 脚本自动化常见运维任务,服务通过 Docker / Docker Compose 编排部署。",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "独立开发的多智能体工作流",
        impact:
          "3 个专业 AI 智能体 + MCP Memory Server:规格、编码、审查无切换",
        stack: ["Claude", "MCP", "MCP Memory Server", "Multi-agent", "知识图谱"],
        summary:
          "为复杂系统的单人开发场景设计并搭建多智能体工作流:三个专业 AI 智能体(战略顾问 · 知识库管理员 · IDE 内开发者)通过 MCP Memory Server 与共享知识层通信。每个智能体有独立角色、约束与上下文;知识库存放 ADR 与决策;Memory Server 承载工作上下文与子系统状态。",
      },
      {
        group: "ai",
        slug: "realtime-voice-agent-pbx",
        title: "企业虚拟 PBX 上的实时语音智能体",
        impact:
          "通过企业虚拟 PBX 与客户进行 LLM 实时对话,基于知识库检索,遇到模糊场景自动升级人工",
        stack: ["OpenAI Realtime API", "SIP", "虚拟 PBX", "RAG", "Python"],
        summary:
          "搭建实时语音智能体,通过企业虚拟 PBX 实时回答客户问题,信息源自知识库与产品目录。实时模型维持自然对话,通过 RAG 从知识库提取答案,遇到模糊场景自动升级到人工。不是「通话结束后再回听录音分析」,而是「LLM 在通话中实时与客户对话」。",
      },
      {
        group: "ai",
        slug: "llm-call-analysis-bi-crm",
        title: "LLM 通话分析与 BI / CRM 流水线",
        impact: "虚拟 PBX 数据进入 BI,GPT-4 自动审听通话",
        stack: ["Asterisk", "FreePBX", "MikoPBX", "Megafon PBX", "Python", "ChatGPT API"],
        summary:
          "运维企业 PBX 与 Megafon 虚拟 PBX,优化通信与互联网成本。开发 Python 导出脚本将数据接入 BI 系统,集成 GPT-4 自动分析通话内容并将报告写回 CRM。",
      },
    ],
    timeline: [
      {
        company: "Detsky Mir",
        logo: "https://www.google.com/s2/favicons?domain=detmir.ru&sz=64",
        role: "Senior SysOps",
        period: "2023 年 10 月 — 至今",
        location: "莫斯科",
        highlights: [
          "企业级基础设施现代化:Linux 栈重构、跨三国的 AD 林、VMware 体系。",
          "从零搭建生产监控,覆盖数千个对象:自定义模板、跨分支的代理集群、门店内 Agent 自动化部署。",
          "整体基础设施的唯一可信数据源(Single Source of Truth)通过 Ansible / Bash / PowerShell 扫描器自动填充,并与虚拟化平台同步;Agent 与配置统一从该数据源下发。",
          "关键企业服务的反向代理层:负载均衡、企业邮件在 Web 层的 SSO。",
        ],
      },
      {
        company: "企业客户(NDA)",
        logoIcon: "Lock",
        role: "Solutions Architect · 项目制",
        period: "2024 — 至今",
        location: "莫斯科",
        highlights: [
          "从零设计并搭建企业基础设施:AD、Exchange + DAG。",
          "WireGuard + GRE + OSPF + FRR 的多站点路由,MikroTik RouterOS 7。",
          "PMG + HAProxy SNI 路由的邮件链路。",
          "ACME → Exchange 证书自动化流水线。与主职并行。",
        ],
      },
      {
        company: "Leto Realty",
        logo: "https://www.google.com/s2/favicons?domain=leto-realty.ru&sz=64",
        role: "IT 负责人",
        period: "2021 年 6 月 — 2023 年 9 月",
        location: "索契",
        highlights: [
          "全权负责 IT 职能:预算、供应商、采购、合同。",
          "高可用 RDS 农场、FSLogix、虚拟 PBX,基于 MikroTik / TP-Link / UniFi 的内部网络。",
          "办公室与数据中心间的站点间 IPSec VPN,基于 MikroTik 与 OpenVPN 的数据中心链路。",
          "跨两国的基础设施:两个数据中心与 4 个远程办公室。",
          "Hyper-V → ESXi 迁移、ESXi 5 → 6.7 升级、vCenter 7 部署、三站点分布式 Veeam。",
          "AD 从 Windows Server 2008 升级到 2022,域合并。",
          "部署并运维 MS Exchange、WSUS、Zabbix、OpenVPN、Nextcloud、WTware 瘦终端。",
          "Python 自动化与基于 GPT-4 的通话分析,报告写回 CRM。",
          "互联网接入成本下降约 66%。",
          "指导三名分布于远程办公室的系统管理员。",
        ],
      },
      {
        company: "Digital Systems",
        logo: "https://www.google.com/s2/favicons?domain=cgood.ru&sz=64",
        role: "高级系统管理员",
        period: "2020 年 6 月 — 2021 年 5 月",
        location: "索契",
        highlights: [
          "设计并运维约 15 台裸金属服务器上的高可用 VMware 集群(vSphere 6.7–7)。",
          "基于 vCloud Director 的私有云与分布式备份系统。",
          "Windows 与 Linux:CentOS、Ubuntu Server、Debian;Hyper-V、ESXi、Proxmox。",
          "网络:MikroTik、Eltex、Ubiquiti、TP-Link Enterprise;VLAN、RADIUS、WLAN、ACL;基于 pfSense / OPNsense / MikroTik 的 VPN。",
          "Zabbix(服务端 + 代理)、Grafana、Veeam B&R、配置自动备份。",
          "1C 服务器版、MS Exchange 2016–2019(DAG)、MailCow、MikoPBX、Asterisk、FreePBX。",
          "文档:SOP、runbook、DRP、技术规格。任务分配与初级同事指导。",
        ],
      },
      {
        company: "Gift66(ekb.gifts) · 个体经营",
        logo: "/logos/gift66.png",
        role: "创始人 · 电商",
        period: "2015 — 2018",
        location: "叶卡捷琳堡",
        highlights: [
          "自营电商「Gift66」— 叶卡捷琳堡的礼品与礼品卡。",
          "全生命周期:启动、营销推广、最终结束。",
          "与工程工作并行运营:P&L、营销、运营。由此具备从业务视角理解 IT 需求的能力,而不仅停留在工单层面。",
        ],
      },
      {
        company: "SKB Kontur",
        logo: "https://www.google.com/s2/favicons?domain=kontur.ru&sz=64",
        role: "系统管理员 · 工程师",
        period: "2014 — 2017",
        location: "叶卡捷琳堡",
        highlights: [
          "从外包入职俄罗斯顶级 IT 公司之一,担任内部工程师。",
          "在生产级产品环境中负责企业级工程任务。",
        ],
      },
      {
        company: "Fresh Support · IT 外包",
        logo: "https://www.google.com/s2/favicons?domain=freshsupport.ru&sz=64",
        role: "支持工程师",
        period: "2012 — 2014",
        location: "叶卡捷琳堡",
        highlights: [
          "客户包括 MTV 电视频道(后更名为 Pyatnitsa)与多家广播电台。",
          "广泛的故障排查范围:基础设施、网络、电话系统、终端用户支持。",
        ],
      },
    ],
    education: [
      {
        company: "Skillbox · 在线",
        logo: "https://www.google.com/s2/favicons?domain=skillbox.ru&sz=64",
        role: "DevOps Engineer Pro 课程",
        period: "持续教育",
        highlights: [
          "容器化:Docker、Docker Compose。",
          "编排:Kubernetes。",
          "基础设施即代码:Terraform、Ansible。",
          "CI / CD:GitLab CI、GitHub Actions。",
          "云、监控、SRE 实践。",
        ],
      },
    ],
    contactFormat: "仅远程协作,不接受驻场或出差。",
    contactLocation: "莫斯科 · UTC+3",
    sectionTitles: {
      projectsEyebrow: "精选案例",
      projectsTitle: "架构师级别的实战交付案例",
      experienceEyebrow: "经历",
      experienceTitle: "12+ 年",
      educationEyebrow: "课程",
      contactEyebrow: "联系",
      contactTitle:
        "如果您正在寻找能把复杂基础设施落地到生产环境并长期运维的架构师,或正为出海俄罗斯市场的中国企业物色本地化技术合作方,欢迎直接联系。",
    },
    meta: {
      title: "Oleg Tempalov — IT 基础设施架构师 · 中俄技术对接",
      description:
        "12+ 年俄罗斯企业基础设施经验。面向出海俄罗斯市场的中国科技企业,提供基础设施搭建、数据本地化合规(152-ФЗ)与跨境技术对接。Linux / Windows 系统架构师级,AI 智能体驱动的业务流程自动化,生产环境 LLM 落地。仅远程协作。",
    },
  },
};
