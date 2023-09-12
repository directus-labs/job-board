import { createDirectus } from '@directus/sdk';
import { rest } from '@directus/sdk/rest';

export type Job = {
  id: number;
  title: string;
  company: string;
  content: string;
  location: string;
  datePosted: string;
  logo: string;
  tags: string[];
  remote: boolean;
  salaryRange: string;
};

type Schema = {
  jobs: Job[];
};

const directus = createDirectus<Schema>(process.env.DIRECTUS_URL!).with(rest());

export default directus;
