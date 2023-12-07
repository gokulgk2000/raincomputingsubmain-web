// //Projects
import ProjectsOverview from '../pages/Projects/ProjectOverview/projects-overview';

// Authentication related pages
import Logout from '../pages/Authentication/Logout';

//Custom
import RainRegister from '../../src/rainComputing/pages/auth/Register';
import RainLogin from '../../src/rainComputing/pages/auth/Login';
import UserProfile from '../../src/rainComputing/pages/user/Profile';
import AttorneyRegister from '../../src/rainComputing/pages/user/AttorneyRegister';
import FirmLanding from '../../src/rainComputing/pages/attorney/FirmLanding';
import FirmCreate from '../../src/rainComputing/pages/user/FirmCreate';
import AttorneyLanding from '../../src/rainComputing/pages/attorney/AttorneyLanding';
import AttorneyDetailsCard from '../../src/rainComputing/pages/attorney/attorneyLanding/AttorneyDetailsCard';
import FirmInfo from '../../src/rainComputing/pages/attorney/firmLanding/firmInfo';
import VerifyEmailPage from '../../src/rainComputing/pages/auth/verifyEmail';
import emailForgetPassword from '../../src/rainComputing/pages/auth/emailForgetPassword';
import ForgetPasswordPage from '../../src/rainComputing/pages/auth/forgetPassword';
import ChatRc from '../../src/rainComputing/pages/chat/Chat';


import AdminLogin from '../../src/rainComputing/pages/admin/adminLogin/login';
import Admin from '../../src/rainComputing/pages/admin/Admin';
import usersList from '../../src/rainComputing/pages/admin/usersList';
import attorneysList from '../../src/rainComputing/pages/admin/attorneysList';
import caseList from '../../src/rainComputing/pages/admin/caseList';
import UserDetails from '../../src/rainComputing/pages/admin/UserDetails';
import AttorneyDetails from '../../src/rainComputing/pages/admin/AttorneyDetails';
import CaseDetails from '../../src/rainComputing/pages/admin/CaseDetails';

import RequestUser from '../../src/rainComputing/pages/user/AppointmentLanding/ReqUser';
import Payment from '../../src/rainComputing/pages/user/AppointmentLanding/PaymentPage/Payment';
import PaymentVia from '../../src/rainComputing/pages/user/AppointmentLanding/Paymentvia';
// import PaymentStatus from "rainComputing/pages/user/AppointmentLanding/PaymentStatus"
import AppointmentCard from '../../src/rainComputing/pages/user/AppointmentLanding/AppointmentStatus';
import PSwrapper from '../../src/rainComputing/pages/user/AppointmentLanding/PSwrapper';
import PaymentTranaction from '../../src/rainComputing/pages/admin/adminLogin/TransactionDetails';
import Guide from '../../src/rainComputing/pages/guide';
import Reminder from '../../src/rainComputing/pages/reminder';
import UserReminders from '../../src/rainComputing/pages/reminder/UserReminders';
import Calender from '../../src/rainComputing/pages/Calendar/Calendar';
import CompletedCase from '../../src/rainComputing/components/chat/CompletedCase';
import Dashboard from '../../src/rainComputing/pages/reminder/Dashboard';
import DocketMenu from '../../src/rainComputing/pages/docket/DocketMenu';
import CreateEvents from '../../src/rainComputing/pages/docket/CreateEvents';
import ManageEvents from '../../src/rainComputing/pages/docket/ManageEvents';
import EventByCase from '../../src/rainComputing/pages/docket/EventByCase';
import ManageDomains from '../../src/rainComputing/components/chat/ManageDomains'

const authProtectedRoutes = [
    //Projects
    { path: '/projects-overview', component: ProjectsOverview },
    { path: '/projects-overview/:id', component: ProjectsOverview },
    //Blog

    //Custom Pages
    { path: '/profile', component: UserProfile },
    { path: '/attorney-signup', component: AttorneyRegister },
    { path: '/firmcreate', component: FirmCreate },
    { path: '/firmlanding', component: FirmLanding },
    { path: '/reqattorney', component: AttorneyLanding },

    { path: '/attorneydetail', component: AttorneyDetails },
    { path: '/attorneydetail', component: AttorneyDetailsCard },
    { path: '/firminfo', component: FirmInfo },
    { path: '/chat-rc', component: ChatRc },
    { path: '/req-user', component: RequestUser },
    { path: '/payment-page', component: Payment },
    { path: '/payment-status', component: PSwrapper },
    { path: '/payment-via', component: PaymentVia },
    { path: '/appointment-status', component: AppointmentCard },
    { path: '/reminder-data', component: Reminder },
    { path: '/reminders', component: UserReminders },
    { path: '/completedCase', component: CompletedCase },
    { path: '/reminderDashboard', component: Dashboard },
    { path: '/calendar', component: Calender },
    { path: '/docket', component: DocketMenu },
    { path: '/create_events', component: CreateEvents },
    { path: '/manage_events', component: ManageEvents },
    { path: '/case_events', component: EventByCase },
    {path: "/manage_domains",component: ManageDomains}
];

const publicRoutes = [
    { path: '/logout', component: Logout },
    { path: '/forgot-password', component: ForgetPasswordPage },
    { path: '/verifyemail', component: VerifyEmailPage },
    { path: '/emailforgotPwd', component: emailForgetPassword },
    { path: '/help', component: Guide },

    //CUSTOM COMPONENTS
    { path: '/register', component: RainRegister },
    { path: '/login', component: RainLogin },
    { path: '/admin', component: AdminLogin },
];
const adminRoutes = [
    //Admin Page
    { path: '/admin-page', component: Admin },
    { path: '/userlist-page', component: usersList },
    { path: '/attorneylist-page', component: attorneysList },
    { path: '/caselist-page', component: caseList },
    { path: '/case-Detail', component: CaseDetails },
    { path: '/user-Detail', component: UserDetails },
    { path: '/attorney-Detail', component: AttorneyDetails },
    { path: '/payment-Detail', component: PaymentTranaction },

];
export { authProtectedRoutes, publicRoutes, adminRoutes };
