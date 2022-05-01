import fs from 'fs';
import path from 'path';
import db from '../models';
import Job from '../types/IJob';

const NETWORK_LOCATION = process.env.BMCJT_NETWORK_LOCATION || '/Users/nopresnik/JOBS/';

const FOLDERS = [
  path.join('01. Current Files', 'Received'),

  path.join('02. Emails and Incoming Correspondence', 'DBYD'),
  path.join('02. Emails and Incoming Correspondence', 'Quote'),

  path.join('03. Soil & Survey'),

  path.join('04. Photos'),

  path.join('05. Laboratory'),

  path.join('06. Footing Design', '01. Issued', 'A (XX-XX-XX)'),
  path.join('06. Footing Design', '01. Issued', 'B (XX-XX-XX)'),
  path.join('06. Footing Design', '02. Drawings'),

  path.join('07. Structural', '01. Issued', 'A (XX-XX-XX)'),
  path.join('07. Structural', '01. Issued', 'B (XX-XX-XX)'),
  path.join('07. Structural', '02. Drawings'),
  path.join('07. Structural', '03. Computations', '00. Output'),
  path.join('07. Structural', '03. Computations', 'CADE'),
  path.join('07. Structural', '03. Computations', 'HYNE'),
  path.join('07. Structural', '03. Computations', 'SmartFrame'),
  path.join('07. Structural', '03. Computations', 'SpaceGass'),

  path.join('08. Inspection'),
];

const folderRangeString = (jobID: number, rounding: number) => {
  let lower = Math.floor(jobID / rounding) * rounding;
  let upper = Math.floor(jobID / rounding) * rounding + rounding;

  if (jobID === lower) {
    lower -= rounding;
    upper -= rounding;
  }

  lower++;

  return lower + ' - ' + upper;
};

const makeJobFolder = async (job: Job): Promise<void> => {
  try {
    const client = await db.Client.findOne({ _id: job.client });

    const buildName: (string | number)[] = [];

    buildName.push(job.jobID);
    if (client?.name) buildName.push(client?.name.trim());
    if (job.location.line1) buildName.push(job.location.line1.trim());
    if (job.location.line2) buildName.push(job.location.line2.trim());
    if (job.location.city) buildName.push(job.location.city.trim());
    if (job.location.state) buildName.push(job.location.state.trim());
    if (job.location.postcode) buildName.push(job.location.postcode.trim());

    const jobFolder = path.join(NETWORK_LOCATION + folderRangeString(job.jobID, 1000), buildName.join(' '));

    if (!fs.existsSync(jobFolder)) {
      FOLDERS.forEach((folder) => {
        fs.mkdirSync(path.join(jobFolder, folder), { recursive: true });
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default { makeJobFolder };
