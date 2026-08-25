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
        "Полный цикл: от серверной до AI-агентов в продакшене. Под ключ.",
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
            "Ядро корпоративной инфраструктуры: от гипервизора до единого входа.",
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
            "Всё повторяющееся уходит в код: IaC, конфигурации, контейнеры.",
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
          "~2400 площадок и ~8900 устройств в одном учёте · автоматика предлагает, сливаю руками",
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
          "Инфраструктура крупной розничной сети жила в таблицах, которые никто не сверял. Собрал учёт на NetBox: ~2400 площадок, ~8900 устройств. Двенадцать таймеров тянут данные из учётных систем, сверяют, пишут обратно, проверяют качество. Опрос сетевого оборудования уходит в отдельную ветку, и сливаю её руками. Автоматика ничего не удаляет. Это правило, а не настройка. Репозиторий на GitLab CI, 841 зелёный тест.",
      },
      {
        group: "infra",
        slug: "keycloak-angie-2fa-exchange",
        title: "2FA / SSO для корпоративной почты на Keycloak + ANGIE",
        impact:
          "Свой 2FA-провайдер на Keycloak, SSO на уровне веб-сервера для OWA и Outlook-клиентов",
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
          "Exchange не умеет второй фактор так, как было нужно. Трогать его внутренности никто бы не дал. Поставил ANGIE фронтом перед OWA и Outlook-клиентами, а 2FA вынес в Keycloak со своим провайдером. Сам Exchange не тронул ни строчкой. В проде, через эту схему ходит весь корпоративный почтовый поток.",
      },
      {
        group: "infra",
        slug: "enterprise-infrastructure-from-scratch",
        title: "Enterprise-инфраструктура с нуля",
        impact:
          "4 площадки в 2 странах · 100–200 пользователей · 50+ серверов · почта, AD, сети и сертификаты, solo",
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
          "Четыре площадки в двух странах. На старте пустое поле. Поднял AD, Exchange с DAG между площадками, почту через PMG с HAProxy и SNI-роутингом, маршрутизацию на WireGuard + GRE + OSPF поверх MikroTik RouterOS 7. Сертификаты выпускаются и доезжают до Exchange сами. Сделал трекинг сообщений, по которому можно разобрать инцидент, и BookStack, чтобы всё это было записано. Один, от проекта до сдачи.",
      },
      {
        group: "infra",
        slug: "managed-access-client",
        title: "Управляемый клиент корпоративного доступа",
        impact:
          "Нативные клиенты под Windows и macOS с подписанной политикой · доверие обновлений привязано к центру выдачи",
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
          "Клиент корпоративного доступа под Windows и macOS плюс серверная панель политик. Политику подписываю ECDSA P-256, клиент проверяет её встроенным ключом. Доверие обновлений привязал к выдающему центру, а не к отпечатку. С отпечатком перевыпуск сертификата положил бы обновления сразу всему парку. Машинные данные и профиль пользователя развёл. Вход в панель доменный, по Kerberos. Тесты выросли с 31 до 175. Всё в проде.",
      },
      {
        group: "infra",
        slug: "internal-acme-ca",
        title: "Внутренний удостоверяющий центр с ACME",
        impact:
          "Сертификаты на 60 дней с авто-продлением · подключение сервиса одной командой · панель для остального",
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
          "Сертификаты выписывались руками, поэтому периодически не выписывались вовсе. Поднял внутренний центр выдачи. Промежуточный CA подписал у корпоративного Windows-CA, так что раскатывать новые корни никому не пришлось. ACME выдаёт на 60 дней и продлевает сам, подключить сервис теперь одна команда плюс reload-хук. Без хука продлённый сертификат до демона не доезжает. Куда ACME не дотянулся, там панель. В проде пока Linux.",
      },
      {
        group: "infra",
        slug: "report-access-gateway",
        title: "Шлюз доступа к отчётам по группам каталога",
        impact:
          "Доступ к отчёту решает группа в каталоге. Раздавать руками больше не нужно",
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
          "Отчёты лежали в GitLab Pages, доступ раздавали руками. Написал шлюз: вход через корпоративный OIDC, дальше проверка группы каталога перед каждым отчётом. Сам GitLab наружу не смотрит. Основная возня вышла с cookie. Весь список членства в 4 КБ не влезает, и вместо отчёта пользователь получал бесконечный редирект. Кладу туда только пересечение групп с картой доступов. Единица прав теперь тип отчёта. 73 теста, писал сразу с ними.",
      },
      {
        group: "infra",
        slug: "endpoint-software-delivery",
        title: "Самообслуживание рабочих мест: софт и VDI",
        impact:
          "24 приложения обновляются сами, большинство в проде · зависший ввод в VDI чинится без потери сессий",
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
          "Парк около 4600 машин. Старый сервер управления трогать нельзя. Новый поднял рядом, прод не останавливал. Каталог обновляется сам: тянет версии вендоров, сверяет подпись и хэш, заменяет сборку и раздаёт дальше. 24 приложения, большинство уже в проде. Для VDI написал портал. Он чинит зависший ввод сохранением и возобновлением машины: пользователь не теряет сессии, а я не получаю звонок.",
      },
      {
        group: "infra",
        slug: "active-directory-gpo-audit",
        title: "Гигиена Active Directory: аудит и починка GPO",
        impact:
          "Аудит и починка GPO и ACL на сотнях политик, поэтапно и с путём отката на каждом шаге",
        stack: [
          "PowerShell",
          "Active Directory",
          "Group Policy",
          "GPOZaurr",
          "NetLogon ACL",
          "Security Filtering",
        ],
        summary:
          "Лес большой и старый. Политики в нём десятилетиями правили разные люди. Написал 17 PowerShell-скриптов: найти битые, восстановить Security Filtering после массового даунгрейда на Authenticated Users, вычистить мёртвые NetLogon ACE. Каждый прогон начинается с pre-flight, дальше три фазы, на каждом шаге бэкап и путь отката. Сотни GPO. Ни одного изменения вслепую.",
      },
      {
        group: "infra",
        slug: "active-directory-modernization",
        title: "Модернизация Active Directory",
        impact:
          "Windows Server 2008 → 2022, три страны, мульти-сайт репликация, слияние доменов",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "Windows Server 2008 в проде, несколько доменов, репликация как повезёт. Перевёл лес на актуальную версию и единую структуру. Роли разложил по трём площадкам, объекты из нескольких доменов свёл в один. Репликация стала предсказуемой. Это, собственно, и было целью.",
      },
      {
        group: "infra",
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana и автоматизация",
        impact:
          "Единый мониторинг с картой площадок; аварии больше не отсиживаются под бессрочными подавлениями",
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
          "Zabbix с прокси в удалённых сетях, дашборды в Grafana под диагностику, рутина закрыта скриптами и Docker. Позже добавил географию. Адреса площадок уже лежали в учёте, координаты доехали штатной синхронизацией, своего кода не понадобилось. Около 2000 карт магазинов. Отдельно разгрёб бессрочные ручные подавления: их было в разы больше, чем нужно, и аварии спокойно под ними отсиживались. Покрытие полное, часть точек до города.",
      },
      {
        group: "infra",
        slug: "office-datacenter-networking",
        title: "Сеть между офисами и ЦОД",
        impact:
          "Site-to-site IPSec, резервные каналы, счёт за интернет меньше примерно на две трети",
        stack: ["MikroTik", "Ubiquiti", "TP-Link", "IPSec", "OpenVPN", "VLAN"],
        summary:
          "Несколько офисов и два ЦОД жили каждый сам по себе. Свёл в один контур через site-to-site IPSec. Каналы до ЦОД пересобрал на MikroTik и OpenVPN, часть железа переставил. Счёт за интернет упал примерно на две трети.",
      },
      {
        group: "infra",
        slug: "virtualization-vcenter",
        title: "Виртуализация и vCenter",
        impact:
          "Hyper-V → ESXi, ESXi 5 → 6.7, vCenter 7, отказоустойчивый кластер примерно на 15 узлов",
        stack: ["VMware ESXi", "vCenter", "Hyper-V", "Proxmox", "vCloud Director"],
        summary:
          "Свёл виртуализацию на VMware. Машины с Hyper-V перегнал, поднял vCenter 7 и отказоустойчивый кластер примерно на 15 физических узлов. Рядом вёл облако на vCloud Director.",
      },
      {
        group: "infra",
        slug: "distributed-veeam-drp",
        title: "Распределённый Veeam и DRP",
        impact:
          "Резервное копирование на трёх площадках, конфиги сетевого оборудования копируются сами, DRP",
        stack: ["Veeam B&R", "Synology", "TrueNAS", "NextCloud", "rsync"],
        summary:
          "Резервное копирование на трёх площадках. Полный Veeam-контур под виртуалки, конфигурации сетевого оборудования копируются сами. План восстановления написан и лежит там, где его найдут. Не в столе. Проверял восстановлением, а не галочкой в отчёте.",
      },
      {
        group: "ai",
        slug: "mcp-infra-agent",
        title: "Агент вопрос-ответ по инфраструктуре на MCP",
        impact:
          "Причина галлюцинаций оказалась в слое инструментов · каталог в контексте сжат вдвое",
        stack: [
          "MCP",
          "LLM tool-calling",
          "Python",
          "Telegram Bot API",
          "Docker",
          "GitLab CI",
        ],
        summary:
          "Агент, которому можно задать вопрос про инфраструктуру словами. LLM с tool-calling поверх MCP-серверов учёта и мониторинга, ответы приходят в бот. Прогнал 15 контрольных вопросов и сверил каждый ответ с базой. Честными оказались шесть. Дело было не в модели: узкая схема запросов, нет честного подсчёта, лимит шагов душит. Всё это слой инструментов, там и чинилось. Каталог уходит модели каждую итерацию, поэтому сжал вдвое. В проде. Спроса пока нет.",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "Multi-agent workflow для разработки в соло",
        impact:
          "Три агента через MCP Memory Server и состязательное ревью диффа: выжили 13 из 38 и 14 из 32",
        stack: [
          "Claude",
          "MCP",
          "MCP Memory Server",
          "Multi-agent",
          "Adversarial review",
          "Knowledge graph",
        ],
        summary:
          "Сложную систему тяну один, поэтому собрал вокруг себя трёх агентов: стратег, хранитель базы знаний и разработчик в IDE. Общаются через MCP Memory Server. Вторым заходом добавил состязательное ревью собственного диффа: несколько независимых линз, а потом два скептика пытаются каждую находку развалить. За два прогона выжили 13 из 38 и 14 из 32. «Подтвердилось» тут значит «не смогли опровергнуть». Внешней проверки нет.",
      },
      {
        group: "ai",
        slug: "llm-call-analysis-bi-crm",
        title: "LLM-анализ звонков и BI/CRM pipeline",
        impact:
          "Выгрузка в BI на Python и автоматический разбор разговоров GPT-4 с отчётом в CRM",
        stack: ["Asterisk", "FreePBX", "MikoPBX", "ВАТС Мегафон", "Python", "ChatGPT API"],
        summary:
          "Вёл корпоративную АТС и облачную телефонию, попутно срезал расходы на связь. Статистику вынес в BI выгрузкой на Python. Раньше её считали руками. Разговоры отдал на разбор GPT-4, отчёт приходит руководителю прямо в CRM.",
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
          "MS Exchange, WSUS, Zabbix, OpenVPN, Nextcloud, WTware: внедрение и эксплуатация.",
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
          "Среди клиентов: телеканал MTV (позже «Пятница») и несколько радиостанций.",
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
        "Если нужен архитектор, который доводит сложную инфраструктуру до прода и потом её же эксплуатирует, напишите.",
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
        "End-to-end infrastructure: bare metal and networks up to AI agents running in production.",
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
            "The core of corporate infrastructure: hypervisor up to single sign-on.",
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
          "~2,400 sites and ~8,900 devices in one inventory · automation proposes, I merge by hand",
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
          "A large retail chain ran its infrastructure out of spreadsheets nobody reconciled. I built the inventory on NetBox: ~2,400 sites, ~8,900 devices. Twelve systemd timers pull from the source systems, reconcile, write back, check quality. Network discovery lands in a separate branch. I merge that one by hand. Automation deletes nothing. That's a rule, not a setting. GitLab CI on the repo, 841 green tests.",
      },
      {
        group: "infra",
        slug: "keycloak-angie-2fa-exchange",
        title: "2FA / SSO for mail on Keycloak + ANGIE",
        impact:
          "Custom Keycloak 2FA provider, SSO at the web-server layer for OWA and Outlook clients",
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
          "Exchange can't do a second factor the way we needed. And nobody was going to let me near its internals. So ANGIE went in front of OWA and the Outlook clients, and 2FA moved into Keycloak behind a provider I wrote. Exchange itself I never touched. Not one line. It runs in production. All corporate mail goes through it.",
      },
      {
        group: "infra",
        slug: "enterprise-infrastructure-from-scratch",
        title: "Enterprise infrastructure from scratch",
        impact:
          "4 sites in 2 countries · 100–200 users · 50+ servers · mail, AD, networking and certs, solo",
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
          "Four sites, two countries. Empty field at the start. I stood up AD, Exchange with a DAG across sites, mail through PMG with HAProxy and SNI routing. Routing itself on WireGuard + GRE + OSPF over MikroTik RouterOS 7. Certificates issue and reach Exchange on their own. Message tracking good enough to take an incident apart. BookStack so the whole thing is written down. Built it solo, start to finish.",
      },
      {
        group: "infra",
        slug: "managed-access-client",
        title: "Managed corporate access client",
        impact:
          "Native Windows and macOS clients with signed policy · update trust pinned to the issuing CA",
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
          "Windows and macOS clients for corporate access, plus the policy panel behind them. The server signs policy with ECDSA P-256, the client checks it with an embedded key. Update trust is pinned to the issuing CA, not a thumbprint. Pin the thumbprint and one reissue kills updates fleet-wide. I keep machine data and the user profile apart. Panel login is a domain account, over Kerberos. Tests went from 31 to 175. All in production.",
      },
      {
        group: "infra",
        slug: "internal-acme-ca",
        title: "Internal certificate authority with ACME",
        impact:
          "60-day certificates with auto-renewal · onboarding a service is one command · a panel for the rest",
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
          "Certificates went out by hand, so sometimes they didn't go out at all. I stood up an internal CA. The intermediate is signed by the corporate Windows CA, so nobody had to roll out a new root. ACME issues 60-day certs and renews them itself. Onboarding a service is one command plus a reload hook. Skip the hook and the renewed cert never reaches the daemon. Where ACME can't reach, a panel. Linux only in production so far.",
      },
      {
        group: "infra",
        slug: "report-access-gateway",
        title: "Report access gateway on directory groups",
        impact:
          "A directory group decides access to a report. No more handing it out one by one.",
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
          "Reports sat in GitLab Pages, access handed out by hand. I wrote a gateway: sign-in through the corporate OIDC, then a group check before every report. GitLab itself never faces outward. The cookie was the fiddly part. A full group list blows the 4 KB limit, and the user got an endless redirect. Now it holds only groups that intersect the access map. The unit of permission is now the report type. 73 tests, written alongside.",
      },
      {
        group: "infra",
        slug: "endpoint-software-delivery",
        title: "Workplace self-service: software and VDI",
        impact:
          "24 apps update themselves, most already in production · stuck VDI input cleared without losing sessions",
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
          "Fleet of about 4,600 machines. The legacy management server was off limits, so the new one went up beside it, production never stopped. The catalog updates itself: pulls vendor versions, checks signature and hash, supersedes the build, ships it on. 24 apps, most already in production. For VDI I wrote a portal. It clears stuck input by saving and resuming the machine. The user keeps their sessions, and I don't get the call.",
      },
      {
        group: "infra",
        slug: "active-directory-gpo-audit",
        title: "Active Directory hygiene: GPO repair",
        impact:
          "GPO and ACL audit and repair across hundreds of policies, phased, with a rollback path at every step",
        stack: [
          "PowerShell",
          "Active Directory",
          "Group Policy",
          "GPOZaurr",
          "NetLogon ACL",
          "Security Filtering",
        ],
        summary:
          "Big forest, inherited. Different people had been editing its policies for decades. I wrote 17 PowerShell scripts: find the broken ones, restore Security Filtering after a mass downgrade to Authenticated Users, clear out dead NetLogon ACEs. Every run starts with a pre-flight, then three phases, with a backup and a rollback path at each step. Hundreds of GPOs. Not one blind change.",
      },
      {
        group: "infra",
        slug: "active-directory-modernization",
        title: "Active Directory modernization",
        impact:
          "Windows Server 2008 → 2022, three countries, multi-site replication, merged domains",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "Windows Server 2008 in production, several domains, replication whenever it felt like it. I moved the forest onto a current version, one structure. Roles went out across three sites. Objects from several domains came into one. Replication became predictable. That was the whole point.",
      },
      {
        group: "infra",
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana and automation",
        impact:
          "One monitoring stack with a site map; outages no longer hide under open-ended suppressions",
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
          "Zabbix with proxies in remote networks, Grafana dashboards for diagnostics. Routine went into scripts and Docker. Geography came later. Addresses were already in the inventory, coordinates came over with the built-in sync. No code of my own. About 2,000 store maps. Then I cleared the open-ended suppressions: far more than needed, and outages were quietly waiting them out. Coverage is complete, some points only to city level.",
      },
      {
        group: "infra",
        slug: "office-datacenter-networking",
        title: "Office-to-DC networking",
        impact:
          "Site-to-site IPSec, backup links, internet bill down by about two thirds",
        stack: ["MikroTik", "Ubiquiti", "TP-Link", "IPSec", "OpenVPN", "VLAN"],
        summary:
          "Several offices and two data centers, each living on its own. I pulled them into one managed perimeter over site-to-site IPSec. Links to the data centers I rebuilt on MikroTik and OpenVPN, and moved some hardware. The internet bill dropped by roughly two thirds.",
      },
      {
        group: "infra",
        slug: "virtualization-vcenter",
        title: "Virtualization and vCenter",
        impact:
          "Hyper-V → ESXi, ESXi 5 → 6.7, vCenter 7, a fault-tolerant cluster of about 15 nodes",
        stack: ["VMware ESXi", "vCenter", "Hyper-V", "Proxmox", "vCloud Director"],
        summary:
          "Consolidated virtualization on VMware. Converted the Hyper-V machines over, stood up vCenter 7, and a fault-tolerant cluster on about 15 physical nodes with it. Ran a vCloud Director cloud alongside.",
      },
      {
        group: "infra",
        slug: "distributed-veeam-drp",
        title: "Distributed Veeam and DRP",
        impact:
          "Backup across three sites, network device configs copy themselves, DRP",
        stack: ["Veeam B&R", "Synology", "TrueNAS", "NextCloud", "rsync"],
        summary:
          "Backup across three sites. Full Veeam coverage for the VMs, network device configs copy themselves. The recovery plan is written down and kept where people will find it. I checked it by restoring. Not by a tick in a report.",
      },
      {
        group: "ai",
        slug: "mcp-infra-agent",
        title: "Infrastructure Q&A agent over MCP",
        impact:
          "Hallucinations traced to the tool layer · tool catalog in context cut in half",
        stack: [
          "MCP",
          "LLM tool-calling",
          "Python",
          "Telegram Bot API",
          "Docker",
          "GitLab CI",
        ],
        summary:
          "An agent you ask about infrastructure in plain words. LLM with tool-calling over MCP servers for inventory and monitoring, answers in a bot. I ran 15 test questions, checking each answer against the database. Six held up. Not the model: narrow query schema, no honest counting, step limits choking it. All tool layer. That's where it got fixed. The catalog is resent every iteration, so I halved it. In production. No demand yet.",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "Multi-agent workflow for solo development",
        impact:
          "Three agents over an MCP Memory Server plus adversarial diff review: 13 of 38 and 14 of 32 survived",
        stack: [
          "Claude",
          "MCP",
          "MCP Memory Server",
          "Multi-agent",
          "Adversarial review",
          "Knowledge graph",
        ],
        summary:
          "I carry a complex system alone, so I built three agents around me: a strategist, a knowledge-base keeper, a developer in the IDE. They talk over an MCP Memory Server. On a second pass I added adversarial review of my own diff: several independent lenses, then two skeptics tearing each finding apart. Two runs, 13 of 38 and 14 of 32 survived. \"Confirmed\" here means nobody could refute it. There's no outside check.",
      },
      {
        group: "ai",
        slug: "llm-call-analysis-bi-crm",
        title: "LLM call analysis and BI/CRM pipeline",
        impact:
          "Python exports into BI and automatic GPT-4 call review, report lands in the CRM",
        stack: ["Asterisk", "FreePBX", "MikoPBX", "Megafon PBX", "Python", "ChatGPT API"],
        summary:
          "Ran the corporate PBX and a hosted virtual PBX, and cut the phone bill along the way. Stats went into BI through a Python export. Calls went to GPT-4 for review. The report lands with the manager, right in the CRM.",
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
          "Ran my own e-commerce store, Gift66: gifts and gift certificates in Yekaterinburg.",
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
        "If you need an architect who takes complex infrastructure to production and then runs it, drop a line.",
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
        "从基础设施到生产级 AI 智能体，提供全链路交付。专注中俄技术对接，助力中国企业出海俄罗斯落地。",
      status:
        "面向出海俄罗斯市场的中国科技企业，提供基础设施搭建、数据本地化合规(152-ФЗ)与跨境技术对接。远程协作，接受全职或长期合同，可签署 NDA。",
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
            "企业基础设施的核心：从虚拟化平台到统一身份认证。",
          body: "VMware ESXi · vCenter · Proxmox · Veeam · MS Exchange (DAG) · AD DS · Windows Server · Keycloak · Zabbix",
          more: "Postfix · Dovecot · mailcow · PMG · AD CS · AD FS · DFS · WSUS · WEC · SCCM · RDS+FSLogix · Telegraf · InfluxDB",
        },
        {
          label: "网络、代理与安全",
          intro:
            "把多个站点连成统一网络，并守住安全边界。",
          body: "MikroTik · WireGuard · OSPF · IPSec · GRE · angie · nginx · HAProxy · Wazuh",
          more: "Ubiquiti · pfSense · OPNsense · OpenVPN · Traefik · Caddy · CrowdSec · ModSecurity · Cloudflare WAF · Suricata · Graylog",
        },
        {
          label: "俄罗斯本地云与自动化",
          intro:
            "一切重复性工作皆化为代码：IaC、配置、容器。",
          body: "Yandex Cloud · VK Cloud · AWS · GCP · Azure · Terraform · Ansible · Docker · Python · PowerShell",
          more: "Selectel · cloud.ru · Timeweb · PowerShell DSC · cloud-init · GitLab CI · Bash · Ruby",
        },
        {
          label: "AI 智能体",
          intro:
            "把 LLM 接入生产环境创造价值，而不是停留在演示里。",
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
          "约2400个站点、约8900台设备一本台账 · 自动化只提议，合并由我手工做",
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
          "大型零售连锁的基础设施都散在表格里，没人核对。我用 NetBox 建了台账：约2400个站点，约8900台设备。12个定时器从各系统取数、比对、回写、查质量。网络设备的轮询结果进独立分支，由我手工合并。自动化不删任何东西。这是规矩，不是配置项。仓库跑 GitLab CI，841个测试全绿。",
      },
      {
        group: "infra",
        slug: "keycloak-angie-2fa-exchange",
        title: "Keycloak + ANGIE 邮件 2FA",
        impact:
          "Keycloak 自研 2FA 提供方，Web 层为 OWA 和 Outlook 客户端做 SSO",
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
          "Exchange 做不到我们要的第二因子。它的内部也没人肯让动。于是把 ANGIE 放到 OWA 和 Outlook 客户端前面，2FA 挪进 Keycloak，提供方自己写。Exchange 一行没改。已上生产，全公司邮件流量都走这条路。",
      },
      {
        group: "infra",
        slug: "enterprise-infrastructure-from-scratch",
        title: "从零搭建企业基础设施",
        impact:
          "2国4站点 · 100–200用户 · 50+台服务器 · 邮件、AD、网络、证书，一个人做完",
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
          "两个国家，四个站点。开局一片空白。搭起 AD、跨站点 Exchange DAG、PMG 加 HAProxy SNI 路由的邮件链路。路由本身跑在 MikroTik RouterOS 7 上的 WireGuard + GRE + OSPF。证书自己签发，自己装到 Exchange。做了能查清事故的邮件追溯，又用 BookStack 把这些都记下来。一个人，从设计到交付。",
      },
      {
        group: "infra",
        slug: "managed-access-client",
        title: "企业受控访问客户端",
        impact:
          "Windows 与 macOS 原生客户端，策略带签名 · 更新信任绑到签发 CA",
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
          "Windows 和 macOS 的企业访问客户端，加一个服务端策略面板。策略我用 ECDSA P-256 签，客户端拿内置密钥验。更新的信任绑到签发 CA，不绑指纹。绑指纹的话，证书一换，全部终端立刻更新失败。机器数据和用户配置分开。面板登录走域账号 Kerberos。测试从31条涨到175条。都在生产跑着。",
      },
      {
        group: "infra",
        slug: "internal-acme-ca",
        title: "内部 ACME 证书颁发机构",
        impact:
          "证书60天有效、自动续期 · 服务接入一条命令 · 其余走面板",
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
          "证书靠手工签，于是时不时干脆没人签。我搭了内部颁发机构。中间 CA 由企业 Windows CA 签，新根证书谁都不用装。ACME 签60天，自动续期。服务接入就一条命令加一个 reload 钩子。没有钩子，续下来的证书到不了守护进程。ACME 够不着的地方，用面板签。生产上目前只有 Linux。",
      },
      {
        group: "infra",
        slug: "report-access-gateway",
        title: "基于目录组的报告访问网关",
        impact:
          "报告能不能看，由目录组说了算，不用再手工开通",
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
          "报告放在 GitLab Pages，权限一个个手工开。我写了个网关：先走企业 OIDC 登录，再在每份报告前校验目录组。GitLab 本身不对外。最费劲的是 cookie。整份组列表塞不进 4KB，用户等来的不是报告，是无限重定向。现在只放组和访问映射的交集。权限单位改成报告类型。73个测试，边写边测。",
      },
      {
        group: "infra",
        slug: "endpoint-software-delivery",
        title: "终端自助：软件分发与 VDI",
        impact:
          "24个应用自动更新，多数已上生产 · VDI 卡死修复不丢会话",
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
          "大约4600台终端。遗留的管理服务器动不得，新的就在旁边并行搭起来，生产没停。目录自己更新：抓厂商版本，校验签名和哈希，替换旧包，继续分发。24个应用，大多已在生产。VDI 那边写了个门户。它靠保存并恢复虚拟机来修卡死的输入：用户不丢会话，我也不用接电话。",
      },
      {
        group: "infra",
        slug: "active-directory-gpo-audit",
        title: "AD 治理：GPO 审计与修复",
        impact:
          "数百条 GPO 与 ACL 的审计修复，分阶段推进，每步可回滚",
        stack: [
          "PowerShell",
          "Active Directory",
          "Group Policy",
          "GPOZaurr",
          "NetLogon ACL",
          "Security Filtering",
        ],
        summary:
          "林很大，是接手来的。里面的策略几十年里被不同的人改过。写了17个 PowerShell 脚本：找出坏掉的策略，修回被批量降到 Authenticated Users 的 Security Filtering，清掉失效的 NetLogon ACE。每次跑先做预检，再分三个阶段。每步都有备份和回滚路径。几百条 GPO。没有一次是盲改。",
      },
      {
        group: "infra",
        slug: "active-directory-modernization",
        title: "Active Directory 现代化",
        impact:
          "Windows Server 2008 → 2022，三个国家，多站点复制，多域合并",
        stack: ["Active Directory", "Windows Server", "DNS", "DHCP", "Sites & Replication"],
        summary:
          "生产上跑着 Windows Server 2008，好几个域，复制看运气。把林升到当前版本，结构统一。角色分到三个站点，多个域的对象合并成一个。复制变得可预期。这本来就是目的。",
      },
      {
        group: "infra",
        slug: "zabbix-grafana-automation",
        title: "Zabbix + Grafana 与自动化",
        impact:
          "统一监控加站点地图；故障不再躲在无期限抑制下面",
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
          "Zabbix 加远端网络里的代理，Grafana 仪表盘用来定位故障。日常活儿用脚本和 Docker 收口。后来补了地理维度。站点地址台账里本来就有，坐标靠自带的同步拿过来，自己的代码一行没写。约2000张门店地图。又清了无期限的人工抑制：数量比该有的多出好几倍，故障就安稳躲在下面。覆盖是全的，有些点只到城市一级。",
      },
      {
        group: "infra",
        slug: "office-datacenter-networking",
        title: "办公室与数据中心互联",
        impact:
          "站点间 IPSec、备份链路，互联网账单降了约三分之二",
        stack: ["MikroTik", "Ubiquiti", "TP-Link", "IPSec", "OpenVPN", "VLAN"],
        summary:
          "几个办公室和两个数据中心各过各的。用站点间 IPSec 把它们并成一个受控环境。到数据中心的链路在 MikroTik 和 OpenVPN 上重做，一部分设备换了位置。互联网账单降了大概三分之二。",
      },
      {
        group: "infra",
        slug: "virtualization-vcenter",
        title: "虚拟化与 vCenter",
        impact:
          "Hyper-V → ESXi，ESXi 5 → 6.7，vCenter 7，约15节点高可用集群",
        stack: ["VMware ESXi", "vCenter", "Hyper-V", "Proxmox", "vCloud Director"],
        summary:
          "虚拟化统一到 VMware。Hyper-V 上的虚机全部转过来，部署 vCenter 7。又做了约15台物理节点的高可用集群。同时还带着 vCloud Director 的云。",
      },
      {
        group: "infra",
        slug: "distributed-veeam-drp",
        title: "分布式 Veeam 与 DRP",
        impact:
          "三站点备份，网络设备配置自动留存，配套 DRP",
        stack: ["Veeam B&R", "Synology", "TrueNAS", "NextCloud", "rsync"],
        summary:
          "三个站点都做备份。虚机由 Veeam 全量覆盖，网络设备配置自动备份。恢复计划写好了，放在找得到的地方。验证靠真恢复，不是报告上打个勾。",
      },
      {
        group: "ai",
        slug: "mcp-infra-agent",
        title: "基于 MCP 的基础设施问答智能体",
        impact:
          "幻觉根因在工具层 · 上下文里的工具目录压掉一半",
        stack: [
          "MCP",
          "LLM tool-calling",
          "Python",
          "Telegram Bot API",
          "Docker",
          "GitLab CI",
        ],
        summary:
          "可以用大白话问基础设施的智能体。LLM 通过 tool-calling 调台账和监控的 MCP 服务器，答案发到机器人里。跑了15道对照题，每个答案都跟库里核对。如实的有6道。问题不在模型：查询 schema 太窄，没有可靠计数，步数上限卡死。这些都在工具层，修也在那儿修。工具目录每轮都要发给模型，所以压掉了一半。已在生产。暂时没人用。",
      },
      {
        group: "ai",
        slug: "multi-agent-dev-workflow",
        title: "独立开发的多智能体工作流",
        impact:
          "三个智能体经 MCP Memory Server 协作，对抗式 diff 评审：38留13,32留14",
        stack: [
          "Claude",
          "MCP",
          "MCP Memory Server",
          "Multi-agent",
          "Adversarial review",
          "Knowledge graph",
        ],
        summary:
          "复杂系统我一个人扛，就在身边搭了三个智能体：战略、知识库管理、IDE 里的开发。它们经 MCP Memory Server 通信。第二轮加了对自己 diff 的对抗式评审：先几个独立视角看，再由两个怀疑者逐条推翻。两次跑下来，38条留13条，32条留14条。“确认”在这里的意思是“没能推翻”。没有外部验证。",
      },
      {
        group: "ai",
        slug: "llm-call-analysis-bi-crm",
        title: "LLM 通话分析与 BI / CRM 流水线",
        impact:
          "Python 导出接进 BI，GPT-4 自动分析通话并回写 CRM",
        stack: ["Asterisk", "FreePBX", "MikoPBX", "Megafon PBX", "Python", "ChatGPT API"],
        summary:
          "企业 PBX 和运营商虚拟 PBX 都归我运维。顺手把通信费也压下来了。统计用 Python 导出，接进 BI。通话交给 GPT-4 分析，报告直接进 CRM，发给主管。",
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
          "企业级基础设施现代化：Linux 栈重构、跨三国的 AD 林、VMware 体系。",
          "负责全网的基础设施台账、生产监控与内部服务访问。",
          "运维自动化：GitLab CI 流水线、测试驱动开发、故障复盘。",
        ],
      },
      {
        company: "企业客户(NDA)",
        logoIcon: "Lock",
        role: "Solutions Architect · 项目制",
        period: "2024 — 至今",
        location: "莫斯科",
        highlights: [
          "从零设计并搭建企业基础设施：AD、Exchange + DAG。",
          "WireGuard + GRE + OSPF + FRR 的多站点路由，MikroTik RouterOS 7。",
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
          "全权负责 IT 职能：预算、供应商、采购、合同。",
          "高可用 RDS 农场、FSLogix、虚拟 PBX,基于 MikroTik / TP-Link / UniFi 的内部网络。",
          "办公室与数据中心间的站点间 IPSec VPN,基于 MikroTik 与 OpenVPN 的数据中心链路。",
          "跨两国的基础设施：两个数据中心与 4 个远程办公室。",
          "Hyper-V → ESXi 迁移、ESXi 5 → 6.7 升级、vCenter 7 部署、三站点分布式 Veeam。",
          "AD 从 Windows Server 2008 升级到 2022,域合并。",
          "部署并运维 MS Exchange、WSUS、Zabbix、OpenVPN、Nextcloud、WTware 瘦终端。",
          "Python 自动化与基于 GPT-4 的通话分析，报告写回 CRM。",
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
          "网络：MikroTik、Eltex、Ubiquiti、TP-Link Enterprise;VLAN、RADIUS、WLAN、ACL;基于 pfSense / OPNsense / MikroTik 的 VPN。",
          "Zabbix(服务端 + 代理)、Grafana、Veeam B&R、配置自动备份。",
          "1C 服务器版、MS Exchange 2016–2019(DAG)、MailCow、MikoPBX、Asterisk、FreePBX。",
          "文档：SOP、runbook、DRP、技术规格。任务分配与初级同事指导。",
        ],
      },
      {
        company: "Gift66(ekb.gifts) · 个体经营",
        logo: "/logos/gift66.png",
        role: "创始人 · 电商",
        period: "2015 — 2018",
        location: "叶卡捷琳堡",
        highlights: [
          "自营电商“Gift66”：叶卡捷琳堡的礼品与礼品卡。",
          "全生命周期：启动、营销推广、最终结束。",
          "与工程工作并行运营：P&L、营销、运营。由此具备从业务视角理解 IT 需求的能力，而不仅停留在工单层面。",
        ],
      },
      {
        company: "SKB Kontur",
        logo: "https://www.google.com/s2/favicons?domain=kontur.ru&sz=64",
        role: "系统管理员 · 工程师",
        period: "2014 — 2017",
        location: "叶卡捷琳堡",
        highlights: [
          "从外包入职俄罗斯顶级 IT 公司之一，担任内部工程师。",
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
          "广泛的故障排查范围：基础设施、网络、电话系统、终端用户支持。",
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
          "容器化：Docker、Docker Compose。",
          "编排：Kubernetes。",
          "基础设施即代码：Terraform、Ansible。",
          "CI / CD:GitLab CI、GitHub Actions。",
          "云、监控、SRE 实践。",
        ],
      },
    ],
    contactFormat: "仅远程协作，不接受驻场或出差。",
    contactLocation: "莫斯科 · UTC+3",
    sectionTitles: {
      projectsEyebrow: "精选案例",
      projectsTitle: "架构师级别的实战交付案例",
      experienceEyebrow: "经历",
      experienceTitle: "12+ 年",
      educationEyebrow: "课程",
      contactEyebrow: "联系",
      contactTitle:
        "如果您正在寻找能把复杂基础设施落地到生产环境并长期运维的架构师，或正为出海俄罗斯市场的中国企业物色本地化技术合作方，欢迎直接联系。",
    },
    meta: {
      title: "Oleg Tempalov — IT 基础设施架构师 · 中俄技术对接",
      description:
        "IT 基础设施架构师，12+ 年俄罗斯企业经验。助力中国企业出海俄罗斯：基础设施搭建、数据本地化合规(152-ФЗ)与跨境技术对接。仅远程协作。",
    },
  },
};
