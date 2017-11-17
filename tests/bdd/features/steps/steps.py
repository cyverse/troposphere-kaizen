"""
Implentation of steps.

A step can be a target of a decoractor. This will identify the expected
usage with a scenario.

When defining steps, consider looking at the documentation for the
splinter module for examples. Also, the behaving project has many real
world examples of "steps" that use splinter. Finally, review the steps
defined in operation-sanity:

https://github.com/cyverse/operation-sanity

Note: Operation Sanity is defining End-to-End steps. These tests are
intended to be "integration tests".
"""
import time

from behave import given, when, then

from behaving.web.steps import (given_a_browser,
                                wait_for_timeout,
                                should_see_within_timeout)

# TEST


