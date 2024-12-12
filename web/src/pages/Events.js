import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';

const Events = ({ setUserdata }) => {

    return (
        <section class="page-section" id="events">
        <div class="container">
            <h2 class="page-section-heading text-center text-uppercase text-primary mb-0">Events</h2>
            <div class="divider-custom">
                <div class="divider-custom-line"></div>
                <div class="divider-custom-icon"><i class="fas fa-calendar-alt"></i></div>
                <div class="divider-custom-line"></div>
            </div>
            <div class="text-center">
                <Link to="/postevent" className="btn btn-primary align-center btn-lg"> Ikelti rengini </Link>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 event-card">
                    <div class="card h-100">
                        <img src="https://via.placeholder.com/350x200" class="card-img-top" alt="Event 1"></img>
                        <div class="card-body">
                            <h5 class="card-title">Event Title 1</h5>
                            <ul>
                                <li><strong>Kategorija:</strong> Category 3</li>
                                <li><strong>Data ir Laikas:</strong> Date and Time 3</li>
                                <li><strong>Vieta:</strong> Location 3</li>
                            </ul>
                            <p class="card-text">Brief description of the event. More details can be mentioned here.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 event-card">
                    <div class="card h-100">
                        <img src="https://via.placeholder.com/350x200" class="card-img-top" alt="Event 2"></img>
                        <div class="card-body">
                            <h5 class="card-title">Event Title 2</h5>
                            <ul>
                                <li><strong>Kategorija:</strong> Category 3</li>
                                <li><strong>Data ir Laikas:</strong> Date and Time 3</li>
                                <li><strong>Vieta:</strong> Location 3</li>
                            </ul>
                            <p class="card-text">Brief description of the event. More details can be mentioned here.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 event-card">
                    <div class="card h-100">
                        <img src="https://via.placeholder.com/350x200" class="card-img-top" alt="Event 3"></img>
                        <div class="card-body">
                            <h5 class="card-title">Event Title 3</h5>
                            <ul>
                                <li><strong>Kategorija:</strong> Category 3</li>
                                <li><strong>Data ir Laikas:</strong> Date and Time 3</li>
                                <li><strong>Vieta:</strong> Location 3</li>
                            </ul>
                            <p class="card-text">Brief description of the event. More details can be mentioned here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    );
};

export default Events;
