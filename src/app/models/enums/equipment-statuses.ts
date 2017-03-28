export enum EquipmentStatuses {
  NONE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
  NOT_AVALIABLE = 3
}

let statusColors = {
  [EquipmentStatuses.NOT_AVALIABLE]: '#ffbe4d',
  [EquipmentStatuses.ACTIVE]: '#85d183',
  [EquipmentStatuses.INACTIVE]: '#fb3a3a'
};

let displayTexts = {
  [EquipmentStatuses.NONE]: 'None',
  [EquipmentStatuses.NOT_AVALIABLE]: 'Not avaliable',
  [EquipmentStatuses.ACTIVE]: 'Active',
  [EquipmentStatuses.INACTIVE]: 'Inactive'
};

export namespace EquipmentStatuses {
  export function displayText(status: EquipmentStatuses) {
    return displayTexts[status];
  }

  export function color(status: EquipmentStatuses) {
    return statusColors[status];
  }
}
