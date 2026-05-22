export type Locale = "ru" | "en";

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
  title: string;
  impact: string;
  stack: string[];
  summary: string;
};

export type Pillar = {
  label: string;
  body: string;
};

export type ProfileBundle = {
  profile: {
    name: string;
    role: string;
    roleSubline: string;
    email: string;
    phone: string;
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
      role: "Архитектор IT-систем",
      roleSubline: "Инфраструктура · Автоматизация · AI-агенты",
      email: "oleg@tempalov.ru",
      phone: "+7 (922) 222-58-00",
      summary:
        "Архитектура и реализация под ключ — от серверной до AI-агентов в продакшене.",
      status:
        "Открыт к ролям Solutions Architect, Lead Engineer, Head of Infrastructure. Только удалённо.",
      desiredRole: "Solutions Architect",
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
          body: "VMware ESXi · vCenter · Proxmox · Veeam · MS Exchange (DAG) · Postfix · Dovecot · mailcow · PMG · AD DS · AD CS · AD FS · DFS · WSUS · WEC · SCCM · RDS+FSLogix · Keycloak · Zabbix · Telegraf · InfluxDB · Windows Server",
        },
        {
          label: "Сети, прокси и безопасность",
          body: "MikroTik · Ubiquiti · pfSense · OPNsense · WireGuard · OpenVPN · OSPF · IPSec · GRE · angie · nginx · HAProxy · Traefik · Caddy · CrowdSec · ModSecurity · Cloudflare WAF · Suricata · Wazuh · Graylog",
        },
        {
          label: "Облака, автоматизация и AI",
          body: "Yandex Cloud · VK Cloud · Selectel · cloud.ru · Timeweb · Terraform · Ansible · PowerShell DSC · cloud-init · Docker · GitLab CI · Python · PowerShell · Bash · Ruby · OpenAI · Anthropic · MCP · vector DBs",
        },
      ],
    },
    caseGroups: {
      infra: {
        eyebrow: "Infrastructure & operations",
        title: "Инфраструктура и операционка",
      },
      ai: {
        eyebrow: "Automation & AI agents",
        title: "Автоматизация и AI-агенты",
      },
    },
    caseStudies: [
      {
        group: "infra",
        title: "Enterprise-инфраструктура с нуля",
        impact:
          "Three-site mail/AD/networking + cert automation, спроектировано и собрано solo, под ключ",
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
          "Спроектировал и построил корпоративную инфраструктуру для крупного заказчика с нуля: AD, Exchange с DAG между площадками, mail-pipeline через PMG + HAProxy с SNI-роутингом, three-site routing на WireGuard + GRE + OSPF + FRR, MikroTik RouterOS 7, cert automation pipeline ACME → Exchange. Forensic-готовый трекинг сообщений, BookStack для документации. Под ключ, без передачи на стороны.",
      },
      {
        group: "infra",
        title: "Модернизация Active Directory",
        impact: "Win Server 2008 → 2022, 3 страны, мульти-сайт репликация, слияние доменов",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "Перевёл унаследованный AD-лес на актуальную версию и единую структуру: распределение ролей по трём площадкам, миграция объектов из нескольких доменов в один, предсказуемая репликация и снижение операционного риска.",
      },
      {
        group: "infra",
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
        title: "Виртуализация и vCenter",
        impact: "Hyper-V → ESXi, ESXi 5 → 6.7, vCenter 7, кластер на ~15 bare-metal",
        stack: ["VMware ESXi", "vCenter", "Hyper-V", "Proxmox", "vCloud Director"],
        summary:
          "Консолидировал виртуализацию на VMware, конвертировал виртуальные машины с Hyper-V, поднял vCenter 7 и отказоустойчивый vSphere-кластер. Параллельно работал с облаком на vCloud Director.",
      },
      {
        group: "infra",
        title: "Распределённый Veeam и DRP",
        impact: "Backup на трёх площадках, автоматическое копирование конфигов, DRP",
        stack: ["Veeam B&R", "Synology", "TrueNAS", "NextCloud", "rsync"],
        summary:
          "Выстроил распределённую систему резервного копирования на трёх площадках: полный Veeam-контур для виртуалок, автоматическое копирование конфигураций сетевого оборудования и документированный disaster recovery plan.",
      },
      {
        group: "infra",
        title: "Сеть между офисами и ЦОД",
        impact: "Site-to-site IPSec, резервные каналы, ~-66% затрат на интернет",
        stack: ["MikroTik", "Ubiquiti", "TP-Link", "IPSec", "OpenVPN", "VLAN"],
        summary:
          "Объединил несколько офисов и два ЦОД в единый управляемый контур через site-to-site IPSec VPN, переосмыслил каналы до ЦОД на MikroTik и OpenVPN, и пересобрал сетевое оборудование — расходы на интернет-связность упали примерно на две трети.",
      },
      {
        group: "infra",
        title: "Zabbix + Grafana и автоматизация",
        impact: "Единый мониторинг с прокси в филиалах и автоматизация рутины",
        stack: ["Zabbix", "Grafana", "Python", "PowerShell", "Bash", "Docker"],
        summary:
          "Собрал Zabbix с прокси-серверами в удалённых сетях и Grafana-дашборды для быстрой диагностики. Автоматизировал типовые задачи администрирования скриптами на Python, PowerShell и Bash и разворачивал сервисы в Docker / Docker Compose.",
      },
      {
        group: "ai",
        title: "Multi-agent workflow для разработки в соло",
        impact:
          "3 специализированных AI-агента + MCP Memory Server = производительность маленькой команды у одного разработчика",
        stack: ["Claude", "MCP", "MCP Memory Server", "Multi-agent", "Knowledge graph"],
        summary:
          "Спроектировал и собрал multi-agent workflow для разработки сложной системы в соло: три специализированных AI-агента (стратегический консультант · keeper knowledge-vault · разработчик в IDE) общаются через MCP Memory Server и shared knowledge layer. Каждый агент имеет свою роль, ограничения и контекст; vault хранит ADR и решения; memory server — рабочий контекст и состояние подсистем. Один человек получает производительность маленькой команды.",
      },
      {
        group: "ai",
        title: "Realtime voice-агент на корпоративной ВАТС",
        impact:
          "Живой разговор LLM с клиентом по корпоративной ВАТС, retrieval по базе знаний, эскалация при неоднозначности",
        stack: ["OpenAI Realtime API", "SIP", "ВАТС", "RAG", "Python"],
        summary:
          "Построил голосового агента, отвечающего в реальном времени на вопросы клиентов по базе знаний и продуктам через корпоративную ВАТС. Realtime-модель ведёт естественный разговор без пауз, тянет ответы из retrieval-слоя по базе знаний, эскалирует на человека при неоднозначности. Не «LLM анализирует записи постфактум», а «LLM сам разговаривает с клиентом в моменте».",
      },
      {
        group: "ai",
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
        role: "Ведущий системный администратор",
        period: "Октябрь 2023 — настоящее время",
        location: "Москва",
        highlights: [
          "Модернизация корпоративной инфраструктуры enterprise-масштаба: обновление Linux-стека, AD-лес в трёх странах, VMware.",
          "Промышленный мониторинг с нуля до прод-контура на тысячи объектов: собственные шаблоны, прокси-сеть в филиалах, автоматизированный деплой агентов в магазинах.",
          "Source of truth для всей инфраструктуры с автоматическим наполнением через скриптовые сканеры (Ansible / Bash / PowerShell) и синхронизацию с системами виртуализации; из источника правды деплоятся агенты и конфигурации.",
          "Reverse-proxy слой для критичных корпоративных сервисов: балансировка, SSO на уровне веб-сервера для корпоративной почты.",
        ],
      },
      {
        company: "Корпоративный клиент (NDA)",
        logoIcon: "Lock",
        role: "Solutions Architect · engagement",
        period: "2024 — настоящее время",
        location: "Москва",
        highlights: [
          "Спроектировал и построил корпоративную инфраструктуру с нуля: AD, Exchange + DAG.",
          "Three-site routing на WireGuard + GRE + OSPF + FRR, MikroTik RouterOS 7.",
          "Mail-pipeline через PMG + HAProxy с SNI-роутингом.",
          "Cert automation pipeline ACME → Exchange. Параллельно с основной ролью.",
        ],
      },
      {
        company: "Лето Недвижимость",
        logo: "https://www.google.com/s2/favicons?domain=leto-realty.ru&sz=64",
        role: "Руководитель IT-отдела",
        period: "Июнь 2021 — Сентябрь 2023",
        location: "Сочи",
        highlights: [
          "Владение IT-функцией end-to-end: бюджет, подрядчики, закупки, договоры.",
          "RDS-ферма HA, FSLogix, ВАТС, внутренняя сеть на MikroTik / TP-Link / UniFi.",
          "Site-to-site IPSec VPN между офисами и ЦОД, каналы до ЦОД на MikroTik и OpenVPN.",
          "Инфраструктура в двух странах: два ЦОД и 4 удалённых офиса.",
          "Миграция Hyper-V → ESXi, ESXi 5 → 6.7, запуск vCenter 7, распределённый Veeam на трёх площадках.",
          "Обновление AD с Win Server 2008 до 2022 и консолидация доменов.",
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
          "Параллельно с инженерной работой — практический опыт ИП и e-commerce.",
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
        role: "Support",
        period: "2012 — 2014",
        location: "Екатеринбург",
        highlights: [
          "Среди клиентов: телеканал MTV (позже — «Пятница») и несколько радиостанций.",
          "Широкий troubleshooting: инфраструктура, сети, телефония, поддержка пользователей.",
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
        "Если нужен архитектор, который не теряется в сложной инфраструктуре",
    },
    meta: {
      title: "Олег Темпалов — Solutions Architect · Infra × Automation × AI",
      description:
        "12+ лет в корпоративной инфраструктуре. Solutions Architect: проектирую системы Linux/Windows на архитекторском уровне, автоматизирую бизнес-процессы агентными системами, интегрирую LLM в продакшен. Только удалённо.",
    },
  },
  en: {
    profile: {
      name: "Oleg Tempalov",
      role: "Solutions Architect",
      roleSubline: "Infrastructure · Automation · AI agents",
      email: "oleg@tempalov.ru",
      phone: "+7 (922) 222-58-00",
      summary:
        "Systems architect. From server room to AI agents in production. End-to-end, from scratch to release.",
      status:
        "Open to Solutions Architect, Lead Engineer, Head of Infrastructure roles. Remote only.",
      desiredRole: "Solutions Architect",
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
          label: "Systems, Active Directory and mail",
          body: "VMware ESXi · vCenter · Proxmox · Veeam · MS Exchange (DAG) · Postfix · Dovecot · mailcow · PMG · AD DS · AD CS · AD FS · DFS · WSUS · WEC · SCCM · RDS+FSLogix · Keycloak · Zabbix · Telegraf · InfluxDB · Windows Server",
        },
        {
          label: "Networking, proxies and security",
          body: "MikroTik · Ubiquiti · pfSense · OPNsense · WireGuard · OpenVPN · OSPF · IPSec · GRE · angie · nginx · HAProxy · Traefik · Caddy · CrowdSec · ModSecurity · Cloudflare WAF · Suricata · Wazuh · Graylog",
        },
        {
          label: "Cloud, automation and AI",
          body: "Yandex Cloud · VK Cloud · Selectel · cloud.ru · Timeweb · AWS · GCP · Azure · Terraform · Ansible · PowerShell DSC · cloud-init · Docker · GitLab CI · Python · PowerShell · Bash · Ruby · OpenAI · Anthropic · MCP · vector DBs",
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
        title: "Enterprise infrastructure from scratch",
        impact:
          "Three-site mail/AD/networking + cert automation, designed and built solo end-to-end",
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
          "Designed and built corporate infrastructure for a large client from scratch: AD, Exchange with DAG between sites, mail pipeline via PMG + HAProxy with SNI routing, three-site routing on WireGuard + GRE + OSPF + FRR, MikroTik RouterOS 7, ACME → Exchange cert automation pipeline. Forensic-friendly message tracking, BookStack for documentation. End-to-end ownership, no handoffs.",
      },
      {
        group: "infra",
        title: "Active Directory modernization",
        impact:
          "Win Server 2008 → 2022, three sites, multi-site replication, merged domains",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "Moved the legacy AD forest onto a current version and a unified structure: role distribution across three sites, object migration from multiple domains into one, predictable replication, and reduced operational risk.",
      },
      {
        group: "infra",
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
          "Designed and rolled out a custom Keycloak-based 2FA provider for corporate mail access. ANGIE sits in front of OWA and Outlook clients and handles SSO at the web-server layer. 2FA runs on the Keycloak side without touching Exchange internals. Live in production, carrying the full corporate mail flow.",
      },
      {
        group: "infra",
        title: "Virtualization and vCenter",
        impact: "Hyper-V → ESXi, ESXi 5 → 6.7, vCenter 7, ~15 bare-metal cluster",
        stack: ["VMware ESXi", "vCenter", "Hyper-V", "Proxmox", "vCloud Director"],
        summary:
          "Consolidated virtualization on VMware, converted VMs from Hyper-V, brought up vCenter 7, and operated a fault-tolerant vSphere cluster. Worked alongside a vCloud Director-based cloud.",
      },
      {
        group: "infra",
        title: "Distributed Veeam and DRP",
        impact: "Backup on three sites, automated config backups, DRP",
        stack: ["Veeam B&R", "Synology", "TrueNAS", "NextCloud", "rsync"],
        summary:
          "Built a distributed backup system across three sites: full Veeam coverage for VMs, automated backups of network equipment configurations, and a documented disaster recovery plan.",
      },
      {
        group: "infra",
        title: "Office-to-DC networking",
        impact: "Site-to-site IPSec, redundant channels, ~66% lower internet cost",
        stack: ["MikroTik", "Ubiquiti", "TP-Link", "IPSec", "OpenVPN", "VLAN"],
        summary:
          "Connected multiple offices and two data centers into a single managed environment via site-to-site IPSec VPN, rebuilt channels to the DCs on MikroTik and OpenVPN, and reworked network equipment — dropping internet connectivity costs by roughly two-thirds.",
      },
      {
        group: "infra",
        title: "Zabbix + Grafana and automation",
        impact: "Unified monitoring with branch proxies and routine work automated",
        stack: ["Zabbix", "Grafana", "Python", "PowerShell", "Bash", "Docker"],
        summary:
          "Set up Zabbix with proxies in remote networks and Grafana dashboards for fast diagnostics. Automated typical admin tasks with Python, PowerShell, and Bash scripts, and deployed services in Docker / Docker Compose.",
      },
      {
        group: "ai",
        title: "Multi-agent workflow for solo development",
        impact:
          "3 specialized AI agents + MCP Memory Server = small-team output from a single developer",
        stack: ["Claude", "MCP", "MCP Memory Server", "Multi-agent", "Knowledge graph"],
        summary:
          "Designed and built a multi-agent workflow for solo development of a complex system: three specialized AI agents (strategic consultant · knowledge-vault keeper · in-IDE developer) communicate through an MCP Memory Server and a shared knowledge layer. Each agent has its own role, constraints, and context; the vault stores ADRs and decisions; the memory server carries working context and subsystem state. A single person operates at the throughput of a small team.",
      },
      {
        group: "ai",
        title: "Realtime voice agent on corporate VATS",
        impact:
          "Live LLM conversation with customers over corporate VATS, retrieval over KB, escalation on ambiguity",
        stack: ["OpenAI Realtime API", "SIP", "VATS", "RAG", "Python"],
        summary:
          "Built a voice agent answering customer questions in real time, sourced from a knowledge base and product catalog, over a corporate VATS. The realtime model holds a natural conversation, pulls answers from a retrieval layer over the KB, and escalates to a human on ambiguity. Not 'LLM reviews recordings after the fact' — 'LLM talks to the customer in the moment'.",
      },
      {
        group: "ai",
        title: "LLM call analysis and BI/CRM pipeline",
        impact: "BI exports from the virtual PBX and automatic GPT-4 call review",
        stack: ["Asterisk", "FreePBX", "MikoPBX", "Megafon PBX", "Python", "ChatGPT API"],
        summary:
          "Ran the corporate PBX and Megafon virtual PBX, optimized mobile and internet costs. Wrote Python exporters that fed BI and integrated GPT-4 to analyze call content with a report pushed back into the CRM.",
      },
    ],
    timeline: [
      {
        company: "Detsky Mir",
        logo: "https://www.google.com/s2/favicons?domain=detmir.ru&sz=64",
        role: "Lead System Administrator",
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
          "Three-site routing on WireGuard + GRE + OSPF + FRR, MikroTik RouterOS 7.",
          "Mail pipeline via PMG + HAProxy with SNI routing.",
          "ACME → Exchange cert automation pipeline. In parallel with primary role.",
        ],
      },
      {
        company: "Leto Realty",
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
        company: "Digital Systems",
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
          "Own e-commerce store «Gift66» — gifts and gift certificates in Yekaterinburg.",
          "Full lifecycle: launch, marketing and promotion, eventual wind-down.",
          "Ran in parallel with engineering work — hands-on sole-proprietor and e-commerce experience.",
        ],
      },
      {
        company: "SKB Kontur",
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
        period: "Continuing education",
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
      projectsEyebrow: "Selected results",
      projectsTitle: "Cases where the architect shows",
      experienceEyebrow: "Experience",
      experienceTitle: "12+ years",
      educationEyebrow: "Courses",
      contactEyebrow: "Contact",
      contactTitle:
        "For teams that need a Solutions Architect calm inside complex infrastructure",
    },
    meta: {
      title: "Oleg Tempalov — Solutions Architect · Infra × Automation × AI",
      description:
        "12+ years in corporate infrastructure. Solutions Architect: design Linux/Windows systems at architect level, automate business processes with agentic systems, integrate LLMs into production. Remote only.",
    },
  },
};
