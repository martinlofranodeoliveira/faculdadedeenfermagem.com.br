import type { CourseLeadSelection } from '../crmLead'
import { FaqCtaSection } from './FaqCtaSection'
import { FooterBottomSection } from './FooterBottomSection'
import { FooterSection } from './FooterSection'
import { GradeSection } from './GradeSection'
import { HealthCoursesSection } from './HealthCoursesSection'
import { MarketSection } from './MarketSection'
import { ProfileBannerSection } from './ProfileBannerSection'

type DeferredLandingSectionsProps = {
  onOpenPopup: () => void
  onOpenCoursePopup: (selection: CourseLeadSelection) => void
}

export function DeferredLandingSections({
  onOpenPopup,
  onOpenCoursePopup,
}: DeferredLandingSectionsProps) {
  return (
    <>
      <FooterSection onOpenPopup={onOpenPopup} />
      <ProfileBannerSection />
      <MarketSection />
      <GradeSection onOpenPopup={onOpenPopup} />
      <HealthCoursesSection onOpenCoursePopup={onOpenCoursePopup} />
      <FaqCtaSection />
      <FooterBottomSection />
    </>
  )
}
