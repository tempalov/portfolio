import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  Headphones,
  KeyRound,
  Layers,
  Network,
  Shield,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Иконка кейса — по слагу, а не по позиции в массиве. Позиционные массивы
 * молча разъезжаются, стоит вставить кейс в середину списка.
 */
export const CASE_ICONS: Record<string, LucideIcon> = {
  "enterprise-infrastructure-from-scratch": Building2,
  "active-directory-modernization": Users,
  "active-directory-gpo-audit": Wrench,
  "keycloak-angie-2fa-exchange": KeyRound,
  "virtualization-vcenter": Layers,
  "distributed-veeam-drp": Shield,
  "office-datacenter-networking": Network,
  "zabbix-grafana-automation": Activity,
  "multi-agent-dev-workflow": Bot,
  "realtime-voice-agent-pbx": Headphones,
  "llm-call-analysis-bi-crm": BarChart3,
};
