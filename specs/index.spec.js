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
        const profile = new Mobileconfig();
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
        const profile = new Mobileconfig();
        profile.setPayloadDescription(payloadDescription);
        assert.equal(profile.PayloadDescription, payloadDescription);
        return done();
      });
    });
  });

  describe('#setPayloadDisplayName()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should set payload display name', function (done) {
        const payloadDisplayName = 'Hello World';
        const profile = new Mobileconfig();
        profile.setPayloadDisplayName(payloadDisplayName);
        assert.equal(profile.PayloadDisplayName, payloadDisplayName);
        return done();
      });
    });
  });

  describe('#setPayloadIdentifier()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should set payload identifier', function (done) {
        const payloadIdentifier = 'Hello World';
        const profile = new Mobileconfig();
        profile.setPayloadIdentifier(payloadIdentifier);
        assert.equal(profile.PayloadIdentifier, payloadIdentifier);
        return done();
      });
    });
  });

  describe('#setPayloadOrganization()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should set payload organization', function (done) {
        const payloadOrganization = 'Hello World';
        const profile = new Mobileconfig();
        profile.setPayloadOrganization(payloadOrganization);
        assert.equal(profile.PayloadOrganization, payloadOrganization);
        return done();
      });
      it('should return an instance of Mobileconfig', function (done) {
        const payloadOrganization = 'Hello World';
        const profile = new Mobileconfig();
        const returnedProfile = profile.setPayloadOrganization(payloadOrganization);
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
        const profile = new Mobileconfig();
        profile.setPayloadRemovalDisallowed(payloadRemovalDisallowed);
        assert.equal(profile.PayloadRemovalDisallowed, payloadRemovalDisallowed);
        return done();
      });
    });
  });

  describe('#webclip()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it('should add a Web Clip', function (done) {
        const data = { Label: 'Hellow World', URL: 'http://hello.world' };
        const profile = new Mobileconfig();
        profile.webClip(data);
        assert.equal(profile.PayloadContent[0].Label, data.Label);
        assert.equal(profile.PayloadContent[0].URL, data.URL);
        return done();
      });
      it('should not add a Web Clip if no URL is provided', function (done) {
        const data = { Label: 'Hellow World' };
        const profile = new Mobileconfig();
        profile.webClip(data);
        assert.equal(profile.PayloadContent.length, 0);
        return done();
      });
      it('should not add a Web Clip if no Label is provided', function (done) {
        const data = { URL: 'http://hello.world' };
        const profile = new Mobileconfig();
        profile.webClip(data);
        assert.equal(profile.PayloadContent.length, 0);
        return done();
      });
    });
  });

  describe('#save()', function () {
    require('../')(options, imports, (error, returns) => {
      const Mobileconfig = returns.mobileconfig;

      it.skip('should save', function (done) {
        return done();
      });
    });
  });

});
