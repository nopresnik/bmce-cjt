import fs from 'fs';
import Job from 'types/IJob';
import db from '../models';

const NETWORK_LOCATION = process.env.NETWORK_LOCATION || '/Users/nopresnik/JOBS/';

const FOLDERS = [
  '01. Current Files/Received',

  '02. Emails and Incoming Correspondence/DBYD',
  '02. Emails and Incoming Correspondence/Quote',

  '03. Soil & Survey',

  '04. Photos',

  '05. Laboratory',

  '06. Footing Design/01. Issued/A (XX-XX-XX)',
  '06. Footing Design/01. Issued/B (XX-XX-XX)',
  '06. Footing Design/02. Drawings',

  '07. Structural/01. Issued/A (XX-XX-XX)',
  '07. Structural/01. Issued/B (XX-XX-XX)',
  '07. Structural/02. Drawings',
  '07. Structural/03. Computations/00. Output',
  '07. Structural/03. Computations/CADE',
  '07. Structural/03. Computations/HYNE',
  '07. Structural/03. Computations/SmartFrame',
  '07. Structural/03. Computations/SpaceGass',

  '08. Inspection',
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
  const client = await db.Client.findOne({ _id: job.client });

  const buildName = `${job.jobID} ${client?.name} ${job.location.line1 || ''} ${job.location.line2 || ''} ${
    job.location.city || ''
  } ${job.location.state || ''} ${job.location.postcode || ''}`;

  const jobFolder = NETWORK_LOCATION + `${folderRangeString(job.jobID, 1000)}/${buildName}/`;

  if (!fs.existsSync(jobFolder)) {
    FOLDERS.forEach((folder) => {
      fs.mkdirSync(jobFolder + folder, { recursive: true });
    });
  }
};

export default { makeJobFolder };
