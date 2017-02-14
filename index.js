/**
 * @briskhome
 * └briskhome-mobileconfig <briskhome-mobileconfig/index.js>
 *
 * Компонент создания конфигурационных профилей для устройств под управлением iOS, macOS, tvOS.
 *
 * @author  Егор Зайцев <ezaitsev@briskhome.com>
 * @version 0.1.0
 */

'use strict';

const fs = require('fs');
const os = require('os');
const uuid = require('uuid-1345');
const plist = require('plist-native');

// const profile = plist.parse(fs.readFileSync('examples/empty.mobileconfig'));
// console.log(profile); /* eslint no-console: 0 */

module.exports = function setup(options, imports, register) {
  /**
   * A configuration profile is an XML file that allows you to distribute configuration
   * information. If you need to configure a large number of devices or to provide lots of custom
   * email settings, network settings, or certificates to a large number of devices, configuration
   * profiles are an easy way to do it.
   */
  function Mobileconfig() {
    this.ConsentText = { default: '' };
    this.PayloadContent = [];
    this.PayloadDescription = '';
    this.PayloadDisplayName = 'Untitled';
    this.PayloadIdentifier = `${os.hostname()}.${uuid.v4()}`;
    this.PayloadOrganization = '';            // Optional.
    this.PayloadRemovalDisallowed = false;
    this.PayloadType = 'Configuration';       // Value is always 'Configuration'. No setters.
    this.PayloadUUID = uuid.v4();             // Random unique value. UUIDv4 by default.
    this.PayloadVersion = 1;                  // Value is always '1'. No setters.

    return this;
  }

  /**
   * Метод #setConsentText() устанавливает текст условий, с которыми должен согласиться пользова-
   * тель для успешной установки профиля.
   */
  Mobileconfig.prototype.setConsentText = function setConsentText(value) {
    this.ConsentText.default = value;
    return this;
  };

  /**
   * A description of the profile, shown on the Detail screen for the profile. This should be
   * descriptive enough to help the user decide whether to install the profile.
   */
  Mobileconfig.prototype.setPayloadDescription = function setPayloadDescription(value) {
    this.PayloadDescription = value;
    return this;
  };

  /**
   * A human-readable name for the profile payload. This name is displayed on the Detail screen.
   * It does not have to be unique.
   */
  Mobileconfig.prototype.setPayloadDisplayName = function setPayloadDisplayName(value) {
    this.PayloadDisplayName = value;
    return this;
  };

  /**
   * A reverse-DNS-style identifier for the specific payload. It is usually the same identifier as
   * the root-level PayloadIdentifier value with an additional component appended.
   */
  Mobileconfig.prototype.setPayloadIdentifier = function setPayloadIdentifier(value) {
    this.PayloadIdentifier = value;
    return this;
  };

  /**
   * Optional. A human-readable string containing the name of the organization that provided the
   * profile. The payload organization for a payload need not match the payload organization in the
   * enclosing profile.
   */
  Mobileconfig.prototype.setPayloadOrganization = function setPayloadOrganization(value) {
    this.PayloadOrganization = value;
    return this;
  };

  /**
   * Optional. Supervised only. If present and set to true, the user cannot delete the profile
   * (unless the profile has a removal password and the user provides it).
   */
  Mobileconfig.prototype.setPayloadRemovalDisallowed = function setPayloadRemovalDisallowed(value) {
    this.PayloadRemovalDisallowed = value;
    return this;
  };

  /**
   *
   */
  Mobileconfig.prototype.certificate = function certificate(data) {
    if (!Object.prototype.hasOwnProperty.call(data, 'PayloadType')) return this;
    if (!Object.prototype.hasOwnProperty.call(data, 'PayloadContent')) return this;

    const payload = {};
    payload.PayloadType = data.PayloadType;
    payload.PayloadUUID = data.PayloadUUID || uuid.v4();
    payload.PayloadContent = data.PayloadContent;
    payload.PayloadIdentifier = `com.apple.security.pkcs12.${payload.PayloadUUID}`;
    payload.PayloadDisplayName = data.PayloadDisplayName;
    payload.PayloadDescription = 'Adds a PKCS#12-formatted certificate';
    payload.PayloadVersion = 1;

    this.PayloadContent.push(payload);

    return this;
  };

  /**
   *
   */
  Mobileconfig.prototype.mail = function mail(data) {
    if (!Object.prototype.hasOwnProperty.call(data, 'EmailAccountType')) return this;

    const payload = {};
    payload.PayloadDescription = 'Configures Email settings';
    payload.PayloadDisplayName = 'Email';
    payload.PayloadIdentifier = `com.apple.mail.managed.${uuid.v4()}`;
    payload.PayloadType = 'com.apple.mail.managed';
    payload.PayloadUUID = uuid.v4();
    payload.PayloadVersion = 1;

    payload.EmailAccountDescription = data.EmailAccountDescription; // Optional.
    payload.EmailAccountName = data.EmailAccountName; // Optional;
    payload.EmailAccountType = data.EmailAccountType; // Required.
    payload.EmailAddress = data.EmailAddress; // Required.

    payload.disableMailRecentsSyncing = data.disableMailRecentsSyncing || false;

    switch (data.EmailAccountType) {
      case 'EmailTypeIMAP': {
        // const x = {
        //   // payload.EmailAccountType: 'EmailTypeIMAP',
        //   // IncomingMailServerAuthentication: 'EmailAuthPassword',
        //   // IncomingMailServerPortNumber: 993,
        //   // IncomingMailServerUseSSL: true,
        //   // OutgoingMailServerAuthentication: 'EmailAuthPassword',
        //   // OutgoingMailServerPortNumber: 587,
        //   // OutgoingMailServerUseSSL: true,
        //   // OutgoingPasswordSameAsIncomingPassword: false,
        //   // SMIMEEnablePerMessageSwitch: false,
        //   // allowMailDrop: false,
        //   // disableMailRecentsSyncing: false
        // };
        break;
      }

      default: {
        return this;
      }
    }
    return this;
  };

  /**
   *
   */
  Mobileconfig.prototype.webClip = function webClip(data) {
    if (!Object.prototype.hasOwnProperty.call(data, 'URL')) return this;
    if (!Object.prototype.hasOwnProperty.call(data, 'Label')) return this;

    const payload = {};
    payload.FullScreen = data.FullScreen || false;
    payload.IsRemovable = data.IsRemovable || false;
    payload.Precomposed = data.Precomposed || false;
    payload.URL = data.URL;
    payload.Label = data.Label;

    payload.PayloadDescription = 'Configures settings for a web clip';
    payload.PayloadDisplayName = 'Web Clip';
    payload.PayloadIdentifier = `com.apple.webClip.managed.${uuid.v4()}`;
    payload.PayloadType = 'com.apple.webClip.managed';
    payload.PayloadUUID = uuid.v4();
    payload.PayloadVersion = 1;

    this.PayloadContent.push(payload);
    return this;
  };

  /**
   *
   */
  Mobileconfig.prototype.wifi = function wifi(data) {
    // First, checking the EncryptionType. Then validating the required payload keys.
    switch (data.EncryptionType) {
      case 'WEP': {
        break;
      }

      case 'WPA': {
        break;
      }

      case 'WPA2': {
        break;
      }

      case 'Any': {
        break;
      }

      case 'None': {
        break;
      }

      default: {
        break;
      }
    }
  };

  /**
   *
   */
  Mobileconfig.prototype.save = function save() {
    const y = plist.buildStringSync(this);

    fs.writeFileSync('examples/test.mobileconfig', y);
  };

  register(null, { mobileconfig: Mobileconfig });
};
