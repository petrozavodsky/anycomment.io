import React from 'react'
import AnyCommentComponent from "./AnyCommentComponent"
import LoginSocialList from './LoginSocialList'

class SendCommentGuest extends AnyCommentComponent {

    /**
     * Check whether it is required to show social icons.
     *
     * @returns {*}
     */
    showSocialIcons = () => {
        const options = this.getOptions();

        return options.isFormTypeWordpress || options.isFormTypeSocials || options.isFormTypeAll;
    };

    /**
     * Check whether it is required to show guest fields such as name, email, website.
     *
     * @returns {*}
     */
    showGuestFields = () => {
        const options = this.getOptions();

        return options.isFormTypeGuests || options.isFormTypeAll;
    };

    render() {
        const settings = this.getSettings();
        const translations = settings.i18;
        const inputs = settings.options.guestInputs;

        let elementInputs = [];

        inputs.forEach(el => {
            if (el === 'name') {
                elementInputs.push(
                    <div className="anycomment anycomment-form__inputs-item anycomment-form__inputs-name">
                        <label form="anycomment-author-name">{translations.name} <span
                            className="anycomment-label-import">*</span></label>
                        <input type="text" name="author_name" id="anycomment-author-name"
                               value={this.props.authorName}
                               required={true}
                               onChange={this.props.handleAuthorNameChange}
                        />
                    </div>);
            } else if (el === 'email') {
                elementInputs.push(
                    <div className="anycomment anycomment-form__inputs-item anycomment-form__inputs-email">
                        <label form="anycomment-author-email">{translations.email} <span
                            className="anycomment-label-import">*</span></label>
                        <input type="email" name="author_email" id="anycomment-author-email"
                               value={this.props.authorEmail}
                               required={true}
                               onChange={this.props.handleAuthorEmailChange}
                        />
                    </div>);
            } else if (el === 'website') {
                elementInputs.push(
                    <div className="anycomment-form__inputs-item anycomment-form__inputs-website">
                        <label form="anycomment-author-website">{translations.website}</label>
                        <input type="text" name="author_url" id="anycomment-author-website"
                               value={this.props.authorWebsite}
                               onChange={this.props.handleAuthorWebsiteChange}
                        />
                    </div>);
            }
        });

        const guestInputList = this.showGuestFields() && elementInputs.length ?
            <div
                className={"anycomment anycomment-form__inputs anycomment-form__inputs-" + elementInputs.length}>
                {elementInputs}
            </div> : null;

        return <React.Fragment>
            {this.showSocialIcons() ?
                <div className="anycomment anycomment-form__guest-socials">
                    <LoginSocialList/>
                </div> : null}

            {guestInputList}
        </React.Fragment>;
    }
}

export default SendCommentGuest;