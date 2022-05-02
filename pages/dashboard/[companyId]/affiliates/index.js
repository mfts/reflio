import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import { useCompany } from '@/utils/CompanyContext';
import { useAffiliate } from '@/utils/AffiliateContext';
import LoadingDots from '@/components/ui/LoadingDots';
import Button from '@/components/ui/Button'; 
import SEOMeta from '@/components/SEOMeta'; 

export default function InnerDashboardPage() {
  const router = useRouter();
  const { user, userFinderLoaded } = useUser();
  const { activeCompany } = useCompany();
  const { userAffiliateDetails } = useAffiliate();

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user, activeCompany]);

  return (
    <>
      <SEOMeta title="Affiliates"/>
      <div className="mb-8">
        <div className="pt-10 wrapper flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl tracking-tight font-extrabold">Affiliates</h1>
          <Button
            href={`/dashboard/${router?.query?.companyId}/affiliates/invite`}
            medium
            primary
          >
            <span>Invite affiliates</span>
          </Button>
        </div>
      </div>
      <div className="wrapper">
        {
          activeCompany && userAffiliateDetails ?
            userAffiliateDetails !== null && userAffiliateDetails?.length > 0 ?
              <div>
                <div className="flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow-md border-2 border-gray-300 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-200">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                                Name
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                Campaign
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                Status
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                Revenue
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {userAffiliateDetails?.map((affiliate) => (
                              <tr key={affiliate?.affiliate_id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                  <div className="flex items-center">
                                    <div className="ml-4">
                                      <span>{affiliate?.invite_email}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  <div className="text-gray-900">{affiliate?.campaign_id}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  <span className={`${affiliate?.accepted === true ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'} inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5`}>
                                    {affiliate?.accepted === true ? 'Active' : 'Invited' }
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  <span>$0</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            :
              <div>
                <p>You have no affiliates.</p>
              </div>
          :
            <LoadingDots/>
        }
      </div>
    </>
  );
}