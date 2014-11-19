//
//  AppDelegate.swift
//  TrackMix
//
//  Created by Learning on 14/11/19.
//  Copyright (c) 2014年 Learning. All rights reserved.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    @IBOutlet weak var window: NSWindow!
    @IBOutlet weak var textField: NSTextField!
    @IBOutlet weak var slider: NSSlider!
    
    var track: Track? = nil
    
    
    @IBAction func mute(sender: AnyObject) {
        self.track!.setVolume(0)
        self.updateUserInterface()
    }

    @IBAction func takeFloatValueForVolumeFrom(sender: AnyObject) {
        self.track!.setVolume(sender.floatValue)
        self.updateUserInterface()
    }

    func updateUserInterface() {
        var volume = self.track!.getVloume()
        self.textField.floatValue = volume
        self.slider.floatValue = volume
    }

    func applicationDidFinishLaunching(aNotification: NSNotification) {
        // Insert code here to initialize your application
        track = Track(volume: 5.0)
    }

    func applicationWillTerminate(aNotification: NSNotification) {
        // Insert code here to tear down your application
    }


}

