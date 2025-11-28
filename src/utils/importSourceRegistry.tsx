import React from 'react';
import {PhoneAndroid, CloudDownload, LinkedIn, MailOutline} from "@mui/icons-material";
import {SvgIconOwnProps} from "@mui/material";

export interface ImportSourceConfig {
  name: string;
  type: string;
  icon?: React.ReactElement<SvgIconOwnProps>;
  description: string;
  isAvailable: boolean;
  customButtonName?: string;
}

export class ImportSourceRegistry {
  private static configs: Record<string, ImportSourceConfig> = {
    contacts: {
      name: 'Mobile contacts',
      type: 'contacts',
      icon: <PhoneAndroid/>,
      description: 'Import from your phone\'s contacts',
      isAvailable: true,
      customButtonName: "Import from Phone"
    },
    gmail: {
      name: 'Gmail',
      type: 'gmail',
      icon: <MailOutline/>,
      description: 'Import your Gmail contacts',
      isAvailable: true
    },
    linkedin: {
      name: 'LinkedIn',
      type: 'linkedin',
      icon: <LinkedIn/>,
      description: 'Import your LinkedIn connections',
      isAvailable: true
    },
    mockdata: {
      name: 'Mock Data',
      type: 'mockdata',
      icon: <CloudDownload/>,
      description: 'Import sample contacts for testing',
      isAvailable: true
    }
  };

  static getConfig(id: string): ImportSourceConfig | undefined {
    return this.configs[id];
  }

  static getName(id: string): string {
    return this.configs[id]?.name || id;
  }

  static getIcon(id: string) {
    const config = this.configs[id];
    return config?.icon;
  }

  static getDescription(id: string): string {
    return this.configs[id]?.description || '';
  }

  static isAvailable(id: string): boolean {
    return this.configs[id]?.isAvailable || false;
  }

  static registerSource(id: string, config: ImportSourceConfig): void {
    this.configs[id] = config;
  }

  static getAllSources(): ImportSourceConfig[] {
    return Object.values(this.configs);
  }
}