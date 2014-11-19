//
//  Track.swift
//  TrackMix
//
//  Created by Learning on 14/11/19.
//  Copyright (c) 2014年 Learning. All rights reserved.
//

import Cocoa

class Track: NSObject {
    var volume: Float

    init(volume: Float = 0.0) {
        self.volume = volume
    }
    
    func setVolume(value: Float) {
        self.volume = value
    }
    
    func getVloume()-> Float {
        return self.volume
    }
}
