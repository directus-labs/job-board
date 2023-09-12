import { readItem, readItems } from '@directus/sdk';
import { GetStaticPaths, GetStaticProps } from 'next';
import directus from '../lib/directus';
import { Box } from '@chakra-ui/react';
import { JobContent } from '@/components/job-content';
import { Job } from '../lib/directus';

type JobDetailsProps = {
  job: Job;
};

export default function JobDetails(props: JobDetailsProps) {
  const { job } = props;
  return (
    <Box p={{ base: '12', lg: '24' }}>
      <JobContent data={job} />
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const jobs = await directus.request(
      readItems('jobs', {
        limit: -1,
        fields: ['id'],
      })
    );
    const paths = jobs.map((job) => {
      // Access the data property to get the array of jobs
      return {
        params: { jobId: job.id.toString() },
      };
    });
    return {
      paths: paths || [],
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const jobId = context.params?.jobId as string;

    const job = await directus.request(
      readItem('jobs', jobId, {
        fields: ['*'],
      })
    );

    if (job) {
      job.logo = `${process.env.DIRECTUS_URL}assets/${job.logo}`;
    }

    return {
      props: {
        job,
      },
    };
  } catch (error) {
    console.error('Error fetching job:', error);
    return {
      notFound: true,
    };
  }
};
