import { Caregiver } from "../../../types.ts";
import { caregivers as mockCaregivers } from '../../data/caregivers.ts';

/**
 * Mock Caregiver Service
 * This is a mock implementation of the CaregiverService class.
 * It is used to test the CaregiverService class without relying on the actual database.
 */
export default class CaregiverService {
  async getCaregiverById(caregiverId: string): Promise<Caregiver> {
    const caregiver = mockCaregivers.find((caregiver) => caregiver.id === caregiverId);

    if (!caregiver) {
      throw new Error('Error: Caregiver not found');
    }

    return caregiver;
  }
}