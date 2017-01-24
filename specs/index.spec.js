/* global after, afterEach, before, beforeEach, describe, it */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint global-require: [0] */
/* eslint func-names: [0] */
/* eslint prefer-arrow-callback: [0] */

/**
 * @briskhome
 * └briskhome-irrigation <briskhome-irrigation/specs/index.spec.js>
 *
 * Юнит-тесты для компонента управления поливом.
 *
 * @author  Егор Зайцев <ezaitsev@briskhome.com>
 * @version 0.3.0-rc.2
 */

'use strict';

const fs = require('fs');
const async = require('async');
const sinon = require('sinon');
const assert = require('chai').assert;

const options = {};
const imports = {};

describe('Mobileconfig', function () {
  describe('#setConsentText()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should add consent text', function (done) {
        const consentText = 'Hello World';
        let profile = new Mobileconfig();
        profile.setConsentText(consentText);
        assert.equal(profile.ConsentText.default, consentText);
        return done();
      });
    });
  });

  describe('#setPayloadDescription()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should set payload description', function (done) {
        const payloadDescription = 'Hello World';
        let profile = new Mobileconfig();
        profile.setPayloadDescription(payloadDescription);
        assert.equal(profile.PayloadDescription, payloadDescription);
        return done();
      })
    });
  });

  describe('#setPayloadDisplayName()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should set payload display name', function (done) {
        const payloadDisplayName = 'Hello World';
        let profile = new Mobileconfig();
        profile.setPayloadDisplayName(payloadDisplayName);
        assert.equal(profile.PayloadDisplayName, payloadDisplayName);
        return done();
      })
    });
  });

  describe('#setPayloadIdentifier()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should set payload identifier', function (done) {
        const payloadIdentifier = 'Hello World';
        let profile = new Mobileconfig();
        profile.setPayloadIdentifier(payloadIdentifier);
        assert.equal(profile.PayloadIdentifier, payloadIdentifier);
        return done();
      })
    });
  });

  describe('#setPayloadOrganization()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should set payload organization', function (done) {
        const payloadOrganization = 'Hello World';
        let profile = new Mobileconfig();
        profile.setPayloadOrganization(payloadOrganization);
        assert.equal(profile.PayloadOrganization, payloadOrganization);
        return done();
      });
      it('should return an instance of Mobileconfig', function (done) {
        const payloadOrganization = 'Hello World';
        let profile = new Mobileconfig();
        let returnedProfile = profile.setPayloadOrganization(payloadOrganization);
        assert.instanceOf(returnedProfile, Mobileconfig);
        return done();
      });
    });
  });

  describe('#setPayloadRemovalDisallowed()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should set payload removal disallowed', function (done) {
        const payloadRemovalDisallowed = true;
        let profile = new Mobileconfig();
        profile.setPayloadRemovalDisallowed(payloadRemovalDisallowed);
        assert.equal(profile.PayloadRemovalDisallowed, payloadRemovalDisallowed);
        return done();
      })
    });
  });

  describe('#webclip()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should add a Web Clip', function (done) {
        const data = { Label: 'Hellow World', URL: 'http://hello.world' };
        let profile = new Mobileconfig();
        profile.webClip(data);
        assert.equal(profile.PayloadContent[0].Label, data.Label);
        assert.equal(profile.PayloadContent[0].URL, data.URL);
        return done();
      });
      it('should not add a Web Clip if no URL is provided', function (done) {
        const data = { Label: 'Hellow World' };
        let profile = new Mobileconfig();
        profile.webClip(data);
        assert.equal(profile.PayloadContent.length, 0);
        return done();
      });
      it('should not add a Web Clip if no Label is provided', function (done) {
        const data = { URL: 'http://hello.world' };
        let profile = new Mobileconfig();
        profile.webClip(data);
        assert.equal(profile.PayloadContent.length, 0);
        return done();
      });
    });
  });

  describe('#save()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should save', function (done) {
        let profile = new Mobileconfig();
        const webclip = { Label: 'DEMO', URL: 'http://habr.ru' };

        const x = fs.readFileSync('examples/ezaitcev.pfx');
        profile.certificate({
          Password: '123',
          PayloadCertificateFileName: 'ezaitcev.pfx',
          PayloadContent: x,
          PayloadDescription: 'Adds a PKCS#12-formatted certificate',
          PayloadDisplayName: 'ezaitcev.pfx',
          PayloadIdentifier: 'com.apple.security.pkcs12.4F626223-93C9-440F-B560-DBCA1B1DE471',
          PayloadType: 'com.apple.security.pkcs12',
          PayloadUUID: '4F626223-93C9-440F-B560-DBCA1B1DE471',
          PayloadVersion: 1,
        });

        profile
          // .setPayloadOrganization('Yahoo, Inc')
          .setConsentText('Do you?')
          .webClip(webclip)
          .save();
          // assert();
        return done();
      })
    });
  });

});
