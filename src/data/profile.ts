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
        slug: "netbox-source-of-truth",
        title: "Единый источник правды по инфраструктуре",
        impact:
          "Один источник правды вместо разрозненных таблиц · автоматика предлагает, человек утверждает",
        stack: [
          "NetBox",
          "NetBox Branching",
          "NAPALM",
          "netbox-sync",
          "PostgreSQL",
          "systemd timers",
          "GitLab CI",
        ],
        summary:
          "Спроектировал и вывел в прод учёт инфраструктуры крупной розничной сети: NetBox как источник правды на ~2400 площадок и ~8900 устройств, конвейер из 12 таймеров от сбора до контроля качества, включая инвентарь виртуализации. Опрос сетевого оборудования завёл не в боевую базу, а в отдельную ветку с ручным merge — автоматика ничего не удаляет. Курс на штатные механизмы вместо своей обвязки провёл жёстко; GitLab CI, TDD, 841 зелёный тест.",
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
        slug: "managed-access-client",
        title: "Управляемый клиент корпоративного доступа",
        impact:
          "Два нативных клиента и сервер политик с подписанной политикой · панель в проде, парковая раскатка впереди",
        stack: [
          ".NET 8",
          "Swift / AppKit",
          "WiX / MSI",
          "macOS pkg",
          "ECDSA P-256",
          "Kerberos / SPNEGO",
          "Authenticode",
        ],
        summary:
          "Разработал клиент корпоративного доступа под Windows и macOS и панель политик: политику подписал на сервере ECDSA P-256, клиент проверяет её встроенным ключом. Доверие обновлений привязал к выдающему центру, а не к отпечатку сертификата — иначе перевыпуск положил бы обновления всему парку. Данные машины и профиль пользователя развёл, вход в панель сделал доменным по Kerberos. Тесты довёл с 31 до 175. Панель в проде, парковой раскатки ещё нет.",
      },
      {
        group: "infra",
        slug: "internal-acme-ca",
        title: "Внутренний удостоверяющий центр с ACME",
        impact:
          "Сертификаты по ACME на 60 дней с авто-продлением · подключение сервиса одной командой · выдача и подпись скриптов через панель",
        stack: [
          "ACME (RFC 8555)",
          "acme-ca-server",
          "Docker Compose",
          "OpenSSL / X.509",
          "AD CS",
          "PowerShell 7 / Pode",
          "osslsigncode",
        ],
        summary:
          "Построил внутренний центр выдачи сертификатов вместо ручной работы: промежуточный CA подписал у корпоративного Windows-CA, и весь парк доверяет выданным сертификатам без новых корней. Выпуск и продление — по ACME, срок 60 дней, подключение сервиса свёл к одной команде с reload-хуком: без него продлённый сертификат не доезжает до демона. Куда ACME не дотягивается, добавил панель выдачи и подпись скриптов с Linux. В проде пока Linux-путь.",
      },
      {
        group: "infra",
        slug: "report-access-gateway",
        title: "Шлюз доступа к отчётам по группам каталога",
        impact:
          "Доступ к каждому отчёту решает членство в группе каталога, а не ручная выдача",
        stack: [
          "Python / FastAPI",
          "Authlib",
          "OIDC + PKCE",
          "Active Directory",
          "GitLab Pages",
          "httpx",
          "Docker",
        ],
        summary:
          "Собрал шлюз доступа к внутренним отчётам: не общий SSO на веб-сервере, а проверка группы каталога перед каждым отчётом, не выставляя наружу сам GitLab. В подписанную cookie положил не весь список членства, а пересечение с картой доступов — сотни имён групп не влезают в лимит 4 КБ и дают вечный цикл редиректов. Единицей прав сделал тип отчёта, а не выдачу вручную: карта «тип → группа» работает белым списком. Написал по TDD, 73 теста.",
      },
      {
        group: "infra",
        slug: "endpoint-software-delivery",
        title: "Самообслуживание рабочих мест: софт и VDI",
        impact:
          "24 приложения обновляются сами · зависший ввод в VDI чинится без потери сессий · пока тестовая коллекция",
        stack: [
          "MECM / SCCM",
          "PowerShell",
          "Evergreen",
          "PSAppDeployToolkit",
          "HttpListener",
          "Hyper-V Failover Cluster",
          "RDS Connection Broker",
        ],
        summary:
          "Собрал самообслуживание на парке около 4600 машин розничной сети: новый сервер управления поднял рядом с унаследованным, без остановки прода. Каталог обновляет себя сам: конвейер берёт версии вендоров, сверяет подпись и хэш, замещает старую сборку и раздаёт контент — 24 приложения. Для VDI написал портал: он чинит зависший ввод сохранением и возобновлением ВМ вместо перезагрузки, сессии не теряются. На парк не раскатывал: пока тестовая коллекция.",
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
        slug: "active-directory-modernization",
        title: "Модернизация Active Directory",
        impact: "Windows Server 2008 → 2022, 3 страны, мульти-сайт репликация, слияние доменов",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "Перевёл унаследованный AD-лес на актуальную версию и единую структуру: распределение ролей по трём площадкам, миграция объектов из нескольких доменов в один, предсказуемая репликация и снижение операционного риска.",
      },
      {
        group: "infra",
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana и автоматизация",
        impact:
          "Единый мониторинг с картой площадок; аварии больше не прячутся под бессрочными подавлениями",
        stack: [
          "Zabbix",
          "Grafana",
          "Zabbix Geomap",
          "NetBox",
          "Python",
          "Bash",
          "Docker",
        ],
        summary:
          "Собрал Zabbix с прокси-серверами в удалённых сетях, Grafana-дашборды для диагностики, рутину закрыл скриптами и Docker. Позже добавил географию: адреса площадок взял из уже имеющегося источника правды, координаты довёз штатной синхронизацией, без своего кода — около 2000 карт магазинов. Сократил бессрочные ручные подавления в разы, и аварии перестали под ними прятаться. Покрытие полное, но часть точек — с точностью до города.",
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
        group: "ai",
        slug: "mcp-infra-agent",
        title: "Агент вопрос-ответ по инфраструктуре на MCP",
        impact:
          "Причина галлюцинаций — в слое инструментов, а не в модели · каталог в контексте 76 216 → 35 388 символов",
        stack: [
          "MCP",
          "LLM tool-calling",
          "Python",
          "Telegram Bot API",
          "Docker",
          "GitLab CI",
        ],
        summary:
          "Построил агента вопрос-ответ по инфраструктуре: LLM с tool-calling поверх MCP-серверов систем учёта и мониторинга, ответы в боте. Сверил ответы на 15 контрольных вопросах с фактами базы: честными вышли 6 из 15. Причину нашёл не в модели, а в слое инструментов: узкая схема запросов, нет честного подсчёта, жёсткие лимиты шагов. Каталог уходит модели на каждой итерации — сжал описания с 76 216 до 35 388 символов. В проде, спроса в команде пока нет.",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "Multi-agent workflow для разработки в соло",
        impact:
          "3 AI-агента через MCP Memory Server плюс состязательное ревью диффа: выжили 13 находок из 38 и 14 из 32",
        stack: [
          "Claude",
          "MCP",
          "MCP Memory Server",
          "Multi-agent",
          "Adversarial review",
          "Knowledge graph",
        ],
        summary:
          "Собрал в соло multi-agent workflow для сложной системы: три AI-агента (стратег · хранитель базы знаний · разработчик в IDE) общаются через MCP Memory Server. Вторым контуром добавил состязательное ревью собственного диффа: несколько независимых линз, каждую находку пробуют опровергнуть два скептика. За два прогона выжили 13 из 38 и 14 из 32; подтверждение значит «не опровергли», внешней проверки нет.",
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
          "Отвечаю за учёт инфраструктуры, промышленный мониторинг и доступ к внутренним сервисам по всей сети.",
          "Автоматизация эксплуатации: конвейеры на GitLab CI, разработка через тесты, разбор инцидентов.",
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
        "Архитектор IT-инфраструктуры, 12+ лет. Строю корпоративные системы Linux/Windows, автоматизирую процессы, довожу AI-агентов до продакшена. Только удалённо.",
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
        slug: "netbox-source-of-truth",
        title: "Single source of truth for infrastructure",
        impact:
          "One source of truth instead of scattered spreadsheets · automation proposes, a human approves",
        stack: [
          "NetBox",
          "NetBox Branching",
          "NAPALM",
          "netbox-sync",
          "PostgreSQL",
          "systemd timers",
          "GitLab CI",
        ],
        summary:
          "Designed and shipped an inventory layer for a large retail chain: NetBox as the source of truth over ~2,400 sites and ~8,900 devices, a pipeline of 12 timers from collection to data-quality checks, virtualization inventory included. Discovery lands in an isolated branch a human merges, not in the live database; automation deletes nothing. Held the line on native features over custom glue; GitLab CI, TDD, 841 green tests.",
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
        slug: "managed-access-client",
        title: "Managed corporate access client",
        impact:
          "Two native clients and a policy server with signed policy · panel in production, fleet rollout still ahead",
        stack: [
          ".NET 8",
          "Swift / AppKit",
          "WiX / MSI",
          "macOS pkg",
          "ECDSA P-256",
          "Kerberos / SPNEGO",
          "Authenticode",
        ],
        summary:
          "Built a corporate access client for Windows and macOS plus its policy panel: the server signs the policy with ECDSA P-256, the client verifies it with an embedded key. Pinned update trust to the issuing CA, not a thumbprint — a reissue would otherwise kill updates fleet-wide. Split machine data from user data, put admin sign-in on Kerberos, grew tests from 31 to 175. The panel is in production; fleet rollout is still ahead.",
      },
      {
        group: "infra",
        slug: "internal-acme-ca",
        title: "Internal certificate authority with ACME",
        impact:
          "60-day ACME certificates with auto-renewal · service onboarding in one command · panel issuance and script signing",
        stack: [
          "ACME (RFC 8555)",
          "acme-ca-server",
          "Docker Compose",
          "OpenSSL / X.509",
          "AD CS",
          "PowerShell 7 / Pode",
          "osslsigncode",
        ],
        summary:
          "Built an internal CA to replace manual issuance: the intermediate is signed by the corporate Windows CA, so its certificates are trusted fleet-wide, no new root. ACME issues and renews 60-day certificates, and onboarding a service is one command plus a reload hook — without it a renewal never reaches the daemon. Where ACME cannot reach, a panel issues certificates and signs scripts from Linux. Only the Linux path is live.",
      },
      {
        group: "infra",
        slug: "report-access-gateway",
        title: "Report access gateway on directory groups",
        impact:
          "The unit of permission became the report type, not a hand-granted account; group membership decides access",
        stack: [
          "Python / FastAPI",
          "Authlib",
          "OIDC + PKCE",
          "Active Directory",
          "GitLab Pages",
          "httpx",
          "Docker",
        ],
        summary:
          "Built an access gateway for internal reports: not blanket SSO at the web server, but a directory group check before every report, without exposing GitLab itself. The signed cookie holds only the intersection of the user's groups with the access map — hundreds of group names overflow the 4 KB limit and turn login into a redirect loop. Made the report type the unit of permission, not a manual grant. Written test-first, 73 tests.",
      },
      {
        group: "infra",
        slug: "endpoint-software-delivery",
        title: "Workplace self-service: software and VDI",
        impact:
          "24 apps update themselves · stuck VDI input cleared without losing open sessions · test collection for now",
        stack: [
          "MECM / SCCM",
          "PowerShell",
          "Evergreen",
          "PSAppDeployToolkit",
          "HttpListener",
          "Hyper-V Failover Cluster",
          "RDS Connection Broker",
        ],
        summary:
          "Built self-service for a retail fleet of ~4,600 machines: stood up a new management site beside the legacy one, no downtime. The catalog updates itself: the pipeline pulls vendor versions, checks the signature and hash, supersedes the old build, and ships it — 24 apps today. For VDI I wrote a portal that clears stuck input with a save/resume, not a reboot, so open sessions survive. No fleet rollout yet: test collection only.",
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
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana and automation",
        impact:
          "Unified monitoring with a site map; outages no longer hide under open-ended manual suppressions",
        stack: [
          "Zabbix",
          "Grafana",
          "Zabbix Geomap",
          "NetBox",
          "Python",
          "Bash",
          "Docker",
        ],
        summary:
          "Built Zabbix with remote-network proxies and Grafana dashboards for diagnostics, and moved routine work into scripts and Docker. Then added geography: pulled site addresses from the existing source of truth; the stock sync carried coordinates over, no custom code, about 2,000 store maps. Cut open-ended manual suppressions several-fold; outages no longer hide under them. Coverage is complete, though some points are city-level.",
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
        group: "ai",
        slug: "mcp-infra-agent",
        title: "Infrastructure Q&A agent over MCP",
        impact:
          "Hallucinations traced to the tool layer, not the model · tool catalog in context 76,216 → 35,388 characters",
        stack: [
          "MCP",
          "LLM tool-calling",
          "Python",
          "Telegram Bot API",
          "Docker",
          "GitLab CI",
        ],
        summary:
          "Built an infrastructure Q&A agent: an LLM with tool-calling over MCP servers for inventory and monitoring, delivered in a bot. Checked 15 control questions against database facts: only 6 held up. The cause was the tool layer, not the model: a narrow query schema, no reliable count, step limits too low. The catalog is resent every iteration, so I compressed it from 76,216 to 35,388 characters. In production, unused so far.",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "Multi-agent workflow for solo development",
        impact:
          "3 AI agents over an MCP Memory Server plus adversarial diff review: 13 findings of 38 and 14 of 32 survived",
        stack: [
          "Claude",
          "MCP",
          "MCP Memory Server",
          "Multi-agent",
          "Adversarial review",
          "Knowledge graph",
        ],
        summary:
          "Designed a multi-agent workflow for solo development of a complex system: three AI agents (strategist · vault keeper · in-IDE developer) talk over an MCP Memory Server. In a second loop I review my own diff adversarially — several independent lenses, then two skeptics try to disprove each finding. Two runs left 13 of 38 and 14 of 32 standing; confirmed only means nobody refuted it, with no external check.",
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
          "Own infrastructure inventory, production monitoring and access to internal services across the whole network.",
          "Operations automation: GitLab CI pipelines, test-driven development, incident analysis.",
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
        "IT infrastructure architect, 12+ years. Building corporate Linux and Windows systems, automating operations, shipping AI agents to production. Remote only.",
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
        slug: "netbox-source-of-truth",
        title: "基础设施的单一事实源",
        impact:
          "以单一事实源取代分散表格 · 自动化只提议,由人工确认",
        stack: [
          "NetBox",
          "NetBox Branching",
          "NAPALM",
          "netbox-sync",
          "PostgreSQL",
          "systemd timers",
          "GitLab CI",
        ],
        summary:
          "为大型零售连锁企业设计并上线基础设施台账体系:以 NetBox 作为单一事实源,覆盖约2400个站点与约8900台设备,由12个定时器组成的流水线从数据采集一直做到数据质量校验,并把虚拟化台账纳入其中。网络设备轮询不写入生产库,而是进入独立数据分支,由人工合并;自动化从不执行删除。严格执行优先使用产品原生能力而非自研胶水层的路线;GitLab CI、TDD、841个测试全部通过。",
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
        slug: "managed-access-client",
        title: "企业受控访问客户端",
        impact:
          "两个原生客户端与策略服务端,策略带签名 · 面板已上生产,尚未全量推送终端",
        stack: [
          ".NET 8",
          "Swift / AppKit",
          "WiX / MSI",
          "macOS pkg",
          "ECDSA P-256",
          "Kerberos / SPNEGO",
          "Authenticode",
        ],
        summary:
          "为 Windows 与 macOS 开发了企业受控访问客户端及配套策略面板:服务端用 ECDSA P-256 签名策略,客户端用内置密钥校验。更新信任绑定到签发 CA 而非证书指纹,否则证书重新签发会让全部终端失去更新。机器数据与用户配置分离,登录面板走域账号 Kerberos。测试从 31 增至 175。面板已在生产运行,终端侧尚未全量推送。",
      },
      {
        group: "infra",
        slug: "internal-acme-ca",
        title: "内部 ACME 证书颁发机构",
        impact:
          "ACME 签发 60 天证书并自动续期 · 一条命令完成服务接入 · 面板签发与脚本签名",
        stack: [
          "ACME (RFC 8555)",
          "acme-ca-server",
          "Docker Compose",
          "OpenSSL / X.509",
          "AD CS",
          "PowerShell 7 / Pode",
          "osslsigncode",
        ],
        summary:
          "搭建内部证书颁发机构,替代手工签发:中间 CA 由企业 Windows CA 签发,签出的证书在全网默认受信,无需分发新的根证书。签发与续期走 ACME,有效期 60 天,服务接入简化为一条命令并配置 reload 钩子——否则续期后的证书不会加载到运行中的守护进程。ACME 覆盖不到的主机改由面板签发,并支持在 Linux 上完成脚本签名。目前仅 Linux 接入路径在生产使用。",
      },
      {
        group: "infra",
        slug: "report-access-gateway",
        title: "基于目录组的报告访问网关",
        impact:
          "权限单位从手工开通改为报告类型,由目录组成员关系决定",
        stack: [
          "Python / FastAPI",
          "Authlib",
          "OIDC + PKCE",
          "Active Directory",
          "GitLab Pages",
          "httpx",
          "Docker",
        ],
        summary:
          "搭建了内部报告的访问网关:不是 Web 层的统一 SSO,而是在每次打开报告前校验目录组成员关系,同时不把 GitLab 本身暴露到外网。关键取舍是签名 cookie 中只放用户组与访问映射的交集——数百个组名会超出 4 KB 上限,导致无限重定向。权限单位改为报告类型而非手工开通,该映射同时充当白名单。全程 TDD,73 个测试。",
      },
      {
        group: "infra",
        slug: "endpoint-software-delivery",
        title: "员工终端自助:软件分发与 VDI",
        impact:
          "24 个应用自动更新 · VDI 卡死输入修复不丢会话 · 目前仅测试集合",
        stack: [
          "MECM / SCCM",
          "PowerShell",
          "Evergreen",
          "PSAppDeployToolkit",
          "HttpListener",
          "Hyper-V Failover Cluster",
          "RDS Connection Broker",
        ],
        summary:
          "为一家零售企业约4600台设备搭建自助体系:在遗留管理站点旁并行新建管理站点,生产不中断;软件目录自动更新——流水线获取厂商版本、校验签名与哈希、用新版本取代旧版本并分发内容,目前24个应用。VDI 侧写了一个门户,用保存并恢复虚拟机代替重启修复卡死的输入,已打开的会话不会丢失。尚未全量推送,当前仅部署到测试集合。",
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
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana 与运维自动化",
        impact:
          "统一监控加门店地图,故障不再被无截止时间的人工抑制掩盖",
        stack: [
          "Zabbix",
          "Grafana",
          "Zabbix Geomap",
          "NetBox",
          "Python",
          "Bash",
          "Docker",
        ],
        summary:
          "搭建带远端代理的 Zabbix 与 Grafana 仪表盘用于快速定位故障,日常运维用脚本和 Docker 收口。后来补上地理维度:站点地址取自已有的单一事实源,坐标通过原生同步机制进入监控,没有自己写代码,产出约2000张门店地图。又把无截止时间的人工抑制压减数倍,故障不再被它们掩盖。覆盖是完整的,但部分点位只精确到城市。",
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
        group: "ai",
        slug: "mcp-infra-agent",
        title: "基于 MCP 的基础设施问答智能体",
        impact:
          "幻觉根因在工具层而非模型 · 上下文中的工具目录 76216 → 35388 字符",
        stack: [
          "MCP",
          "LLM tool-calling",
          "Python",
          "Telegram Bot API",
          "Docker",
          "GitLab CI",
        ],
        summary:
          "构建了基础设施问答智能体:LLM 通过 tool-calling 调用台账与监控系统的 MCP 服务器,答案在机器人里返回。用 15 道对照问题核对数据库事实,仅 6 题如实作答。根因在工具层而非模型:查询 schema 过窄、缺少可靠计数、步数上限过低。工具目录每轮都会重发给模型,于是把描述从 76216 字符压缩到 35388。已在生产运行,团队暂无使用需求。",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "独立开发的多智能体工作流",
        impact:
          "3 个智能体 + 对抗式 diff 评审:两次运行留存 13/38、14/32",
        stack: [
          "Claude",
          "MCP",
          "MCP Memory Server",
          "Multi-agent",
          "Adversarial review",
          "Knowledge graph",
        ],
        summary:
          "为单人开发复杂系统搭建多智能体工作流:三个智能体(战略顾问 · 知识库管理员 · IDE 开发者)经 MCP Memory Server 通信。第二条回路对自身 diff 做对抗式评审:多个独立视角提问,两个证伪智能体逐条尝试推翻。两次运行留存 13/38、14/32,确认仅代表无人推翻,无外部验证。",
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
          "负责全网的基础设施台账、生产监控与内部服务访问。",
          "运维自动化:GitLab CI 流水线、测试驱动开发、故障复盘。",
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
        "IT 基础设施架构师,12+ 年俄罗斯企业经验。助力中国企业出海俄罗斯:基础设施搭建、数据本地化合规(152-ФЗ)与跨境技术对接。仅远程协作。",
    },
  },
};
