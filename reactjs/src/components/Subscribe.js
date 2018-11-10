import React from 'react'
import AnyCommentComponent from "./AnyCommentComponent";
import Icon from "./Icon";
import {faTimes} from '@fortawesome/free-solid-svg-icons'


const LOCALE_STORE_KEY = 'anycomment-subscrine-closed';

class Subscribe extends AnyCommentComponent {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            showForm: true,
        };
    }

    /**
     * Handle email change.
     * @param event
     */
    handleAuthorEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    /**
     * Handle hide form action.
     */
    handleClose = () => {
        this.localStore(this.getStoreKey(), 1);
        this.setState({showForm: false});
    };

    /**
     * Handle form submit for guest and authorized clients.
     * @param e
     * @returns {boolean}
     */
    handleSubmit = (e) => {
        e.preventDefault();

        const self = this;
        const {email} = this.state;
        const {settings} = this.props;

        this.props.axios
            .request({
                method: 'post',
                url: '/subscribe',
                params: {
                    email: email,
                    post: settings.postId,
                },
                headers: {'X-WP-Nonce': settings.nonce}
            })
            .then(function (response) {
                self.handleClose();
                self.showSuccess(settings.i18.subscribed);
            })
            .catch(function (error) {
                self.showError(error);
            });
    };

    /**
     * Get store key + post ID as subscription can be done per post.
     *
     * @returns {string}
     */
    getStoreKey = () => {
        const {settings} = this.props;

        return LOCALE_STORE_KEY + settings.postId;
    };

    /**
     * Check whether component should render or not.
     *
     * @returns {boolean}
     */
    shouldRender = () => {
        const settings = this.getSettings();
        const {showForm} = this.state;

        if (!settings.options.isNotifySubscribers || !showForm || this.getCurrentUser() === null || this.localGet(this.getStoreKey())) {
            return false;
        }

        return true;
    };

    render() {
        if (!this.shouldRender()) {
            return (null);
        }

        const {email} = this.state;
        const settings = this.getSettings();

        return (
            <div className="anycomment anycomment-component anycomment-subscribe">
                <div className="anycomment-subscribe__close" onClick={this.handleClose}>
                    <Icon icon={faTimes}/>
                </div>
                <p>{settings.i18.subscribe_pre_paragraph}</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="anycomment anycomment-subscribe__email">
                        <input onChange={this.handleAuthorEmailChange} type="email" value={email}
                               required={true}/>
                    </div>
                    <div className="anycomment anycomment-subscribe__submit">
                        <input type="submit"
                               className="anycomment-btn"
                               value={settings.i18.subscribe}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Subscribe;