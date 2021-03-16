import './App.css'; 

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import FindPassword from './components/FindPassword/FindPassword';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ShowEmailAddress from './components/ShowEmailAddress/ShowEmailAddress';
import AdminLogin from './components/ZeepsAdmin/AdminLogin/AdminLogin';
import BasicSettings from './components/ZeepsAdmin/BasicSettings/BasicSettings';
import TermsAndConditions from './components/ZeepsAdmin/BasicSettings/TermsAndConditions';
import KakaotalkSetting from './components/ZeepsAdmin/BasicSettings/KakaotalkSettings';
import MemberSettings from './components/ZeepsAdmin/MemberSetting/MemberSettings';
import RegisterMember from './components/ZeepsAdmin/MemberSetting/RegisterMember';
import ManagingMember from './components/ZeepsAdmin/MemberSetting/ManagingMember';
import ManagingManager from './components/ZeepsAdmin/MemberSetting/ManagingManager';
import RegisterManager from './components/ZeepsAdmin/MemberSetting/RegisterManager';
import SearchProperty from './components/ZeepsAdmin/PropertySetting/SearchProperty';
import PropertyList from './components/ZeepsAdmin/PropertySetting/PropertyList';
import RegisterProperty from './components/ZeepsAdmin/PropertySetting/RegisterProperty';
import AssignManagerToProperty from './components/ZeepsAdmin/PropertySetting/AssignManagerToProperty';
import ManageFaq from './components/ZeepsAdmin/FaqSetting/ManageFaq';
import RegisterFaq from './components/ZeepsAdmin/FaqSetting/RegisterFaq';
import LandingPage from './components/LandingPage/LandingPage';
import RegisterPropertyUser from './components/RegisterProperty/RegisterProperty';
import RegisterPropertyStepTwo from './components/RegisterProperty/RegisterPropertyStepTwo';
import RegisterPropertyStepThree from './components/RegisterProperty/RegisterPropertyStepThree';
import PropertyProcessing from './components/RegisterProperty/PropertyProcessing';
import PropertyConfirmContract from './components/RegisterProperty/PropertyConfirmContract';
import Faq from './components/Faq/Faq';
import NotFound from './components/NotFound/NotFound';
import EditPropertyById from './components/ZeepsAdmin/PropertySetting/EditPropertyById';
import EditFaq from './components/ZeepsAdmin/FaqSetting/EditFaq';
import ResetPasswordAfterLogin from './components/ResetPasswordAfterLogin/ResetPasswordAfterLogin';
import EditMember from './components/ZeepsAdmin/MemberSetting/EditMember';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" name="Login" component={Login} />
        <Route exact path="/register" name="Membership Registration" component={Register} />
        <Route exact path="/find-password-and-email" name="Find Password" component={FindPassword} />
        <Route exact path="/change-password" name="Change Password" render={(props) => <ChangePassword {...props} />} />
        <Route exact path="/show-email-addresss" name="Show Email Address" render={(props) => <ShowEmailAddress {...props} />} //component={ShowEmailAddress} 
        />
        <Route exact path="/member-change-password" name="Change Password by member" component={ResetPasswordAfterLogin} />

        <Route exact path="/" name="Landing Page" component={LandingPage} />
        <Route exact path="/register-property" name="Register Property" component={RegisterPropertyUser} />
        <Route exact path="/register-property-step-two" name="Register Property Step Two" component={RegisterPropertyStepTwo} />
        <Route exact path="/register-property-step-three" name="Register Property Step Three" component={RegisterPropertyStepThree} />

        <Route exact path="/property-processing" name="Property processing" component={PropertyProcessing} />
        <Route exact path="/property-detail/:id" name="Property detail" component={PropertyConfirmContract} />

        <Route exact path="/faq" name="faq" component={Faq} />



        {/* Admin Routes */}
        <Route exact path="/admin-login" name="Admin Login" component={AdminLogin} />
        <Route exact path="/basic-settings" name="Admin Basic Settings" component={BasicSettings} />
        <Route exact path="/terms-conditions-privacy" name="Admin Terms and Cond" component={TermsAndConditions} />
        <Route exact path="/kakaotalk-notification-setting" name="Admin Kakaotalk" component={KakaotalkSetting} />

        <Route exact path="/member-setting" name="Admin Member setting" component={MemberSettings} />
        <Route exact path="/register-member" name="Admin Register Member" component={RegisterMember} />
        <Route exact path="/managing-member" name="Admin Managing Member" component={ManagingMember} />
        <Route exact path="/edit-member/:id" name="Admin edit Member" component={EditMember} />
        <Route exact path="/managing-manager" name="Admin Managing Manager" component={ManagingManager} />
        <Route exact path="/register-manager" name="Admin Register Manager" component={RegisterManager} />

        <Route exact path="/search-property" name="Admin Search Property" component={SearchProperty} />
        <Route exact path="/property-list" name="Admin Property List" component={PropertyList} />
        <Route exact path="/admin-register-property" name="Admin Register Property" component={RegisterProperty} />
        <Route exact path="/admin-get-single-property/:id" name="Admin Edit Property" component={EditPropertyById} />
        <Route exact path="/assign-manager-to-property/:id" name="Admin Assign manager to Property" component={AssignManagerToProperty} />

        <Route exact path="/manage-faq" name="Admin manage faq" component={ManageFaq} />
        <Route exact path="/register-faq" name="Admin register faq" component={RegisterFaq} />
        <Route exact path="/edit-faq/:id" name="Admin edit faq" component={EditFaq} />

        <Route path="/not-found" component={NotFound} />
        <Route component={NotFound} />

      </Switch>
    </Router>
  );
}

export default App;
